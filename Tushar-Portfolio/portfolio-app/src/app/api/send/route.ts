import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Clean up expired entries when map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT_MAX;
}

const ContactSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again after a minute." },
        {
          status: 429,
          headers: { "Retry-After": "60" },
        }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const parseResult = ContactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstErrorMessage =
        parseResult.error.issues[0]?.message || "Validation failed.";
      return Response.json(
        { error: firstErrorMessage, issues: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { fullName, email, message } = parseResult.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[/api/send] Missing RESEND_API_KEY environment variable.");
      return Response.json(
        {
          error:
            "Email service is currently unconfigured. Please reach out directly to the email listed on the site.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || config.email;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Portfolio Message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
      react: EmailTemplate({
        fullName,
        email,
        message,
      }) as React.ReactElement,
    });

    if (resendError) {
      console.error("[/api/send] Resend send error:", resendError);
      return Response.json(
        { error: resendError.message || "Failed to deliver email through provider." },
        { status: 502 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message sent successfully!",
        id: resendData?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[/api/send] Unexpected error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return Response.json({ error: message }, { status: 500 });
  }
}

