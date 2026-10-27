import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File, Mail, Linkedin, Github } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col w-full max-w-xl">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-4 font-medium text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default sm:text-xl md:text-xl whitespace-nowrap"
                    )}
                  >
                    AI/ML & Backend Engineer
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-[6px] leading-none text-transparent text-slate-800 text-left",
                          "font-bold text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                          "cursor-default text-edge-outline font-display "
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br className="md:block hidden" />
                        {config.author.split(" ")[1]}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      Open DevTools for a surprise
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>

                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start md:mt-4 font-medium text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default sm:text-xl md:text-xl whitespace-nowrap"
                    )}
                  >
                    Building production-grade intelligent systems
                  </p>
                </BlurIn>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none"
                >
                  <BoxReveal delay={2} width="100%" >
                    <Button className="flex items-center gap-2 w-full sm:w-auto">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href="#contact" className="w-full sm:w-auto">
                        <Button variant={"outline"} className="w-full">
                          Get in Touch
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>tusharsingh.sde@gmail.com</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="flex items-center gap-2">
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                    >
                      <Button variant={"ghost"} size="icon" aria-label="LinkedIn">
                        <SiLinkedin size={24} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                    >
                      <Button variant={"ghost"} size="icon" aria-label="GitHub">
                        <SiGithub size={24} />
                      </Button>
                    </Link>
                    <Link
                      href={`mailto:${config.email}`}
                      className="cursor-can-hover"
                    >
                      <Button variant={"ghost"} size="icon" aria-label="Email">
                        <Mail size={24} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Hackathon badges */}
              <BlurIn delay={1.5} className="mt-8 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                  ISRO BAH 2026 — Grand Finale
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                  SIH 2025 & 2026 — Finalist
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                  Microsoft BWB 1.0 — Finalist
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300">
                  10+ National Hackathons
                </span>
              </BlurIn>
            </div>
          )}
        </div>
        <div className="grid col-span-1" />
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;