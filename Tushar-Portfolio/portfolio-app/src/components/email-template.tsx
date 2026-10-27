import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: "#f9fafb",
      padding: "24px 12px",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          backgroundColor: "#09090b",
          padding: "20px 24px",
          color: "#ffffff",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
          New Portfolio Contact Message
        </h2>
      </div>

      <div style={{ padding: "24px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  width: "100px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Sender:
              </td>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "15px",
                  color: "#111827",
                  fontWeight: 500,
                }}
              >
                {fullName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 0",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                Email:
              </td>
              <td style={{ padding: "8px 0", fontSize: "15px" }}>
                <a
                  href={`mailto:${email}`}
                  style={{ color: "#2563eb", textDecoration: "none" }}
                >
                  {email}
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "13px",
              fontWeight: 600,
              color: "#6b7280",
              textTransform: "uppercase",
            }}
          >
            Message:
          </p>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#1f2937",
              whiteSpace: "pre-wrap",
              borderLeft: "4px solid #2563eb",
            }}
          >
            {message}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "16px 24px",
          fontSize: "12px",
          color: "#9ca3af",
          backgroundColor: "#f9fafb",
          textAlign: "center",
        }}
      >
        Sent from your portfolio contact form • You can reply directly to this email
      </div>
    </div>
  </div>
);

