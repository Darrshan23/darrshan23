"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Newspaper, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastValues, setLastValues] = useState<ContactFormValues | null>(null);

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setLastValues(values);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        reset();
        return;
      }

      if (data.error === "no-provider") {
        setStatus("fallback");
        return;
      }

      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const mailtoHref = lastValues
    ? `mailto:${profile.email}?subject=${encodeURIComponent(lastValues.subject)}&body=${encodeURIComponent(
        `${lastValues.message}\n\n— ${lastValues.name} (${lastValues.email})`
      )}`
    : `mailto:${profile.email}`;

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-[5%] py-28 border-t border-border">
      <SectionHeading number="05" title="Get In Touch" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal direction="left">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="mb-8 max-w-md text-[1.05rem] leading-relaxed text-ink-2">
                Open to SOC, detection engineering, and blue-team collaboration. Drop a message and
                I&apos;ll get back to you — usually within a day.
              </p>
              <div className="space-y-4">
                <ContactRow icon={<Mail size={16} />} label={profile.email} href={`mailto:${profile.email}`} />
                <ContactRow icon={<MapPin size={16} />} label={profile.location} />
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              <SocialLink href={profile.socials.linkedin} icon={<Linkedin size={17} />} />
              <SocialLink href={profile.socials.github} icon={<Github size={17} />} />
              <SocialLink href={profile.socials.medium} icon={<Newspaper size={17} />} />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-7 sm:p-9">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60"
              style={{ background: "radial-gradient(circle, rgba(0,255,102,0.1), transparent 70%)" }}
            />

            <AnimatePresence mode="wait">
              {status === "success" || status === "fallback" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex min-h-[360px] flex-col items-center justify-center gap-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-signal/30 bg-signal/10 text-signal"
                  >
                    <CheckCircle2 size={30} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-ink-1">
                    {status === "success" ? "Message sent." : "Almost there."}
                  </h3>
                  <p className="max-w-xs text-sm text-ink-2">
                    {status === "success"
                      ? "Thanks for reaching out — I'll reply as soon as I can."
                      : "The inbox link isn't wired up yet, so I've prepped your message — just hit send in your email client."}
                  </p>
                  {status === "fallback" && (
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-green to-[#0af5c8] px-6 py-2.5 text-sm font-bold text-bg"
                    >
                      <Mail size={15} /> Open Email Client
                    </a>
                  )}
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs font-medium text-ink-3 underline-offset-4 hover:text-ink-1 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative flex flex-col gap-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" error={errors.name?.message}>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Jane Doe"
                        className={inputClass(!!errors.name)}
                      />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="jane@company.com"
                        className={inputClass(!!errors.email)}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      {...register("subject")}
                      type="text"
                      placeholder="Let's collaborate"
                      className={inputClass(!!errors.subject)}
                    />
                  </Field>

                  <Field label="Message" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell me a bit about what you have in mind..."
                      className={cn(inputClass(!!errors.message), "resize-none")}
                    />
                  </Field>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <MagneticButton
                    as="button"
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-green to-[#0af5c8] px-8 py-3.5 text-sm font-bold text-bg shadow-[0_4px_24px_rgba(0,255,102,0.3)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,255,102,0.45)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[0.72rem] uppercase tracking-wide text-ink-3">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-ink-1 outline-none transition-all duration-200 placeholder:text-ink-3 focus:bg-white/[0.05]",
    hasError
      ? "border-red-500/40 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.12)]"
      : "border-border focus:border-green/50 focus:shadow-[0_0_0_3px_rgba(0,255,102,0.12)]"
  );
}

function ContactRow({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const content = (
    <span className="flex items-center gap-3 text-sm text-ink-2 transition-colors group-hover:text-ink-1">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-green">
        {icon}
      </span>
      {label}
    </span>
  );
  if (href) {
    return (
      <a href={href} className="group inline-block">
        {content}
      </a>
    );
  }
  return <div className="group">{content}</div>;
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink-2 transition-all duration-250 hover:-translate-y-1 hover:border-border-glow hover:bg-green/10 hover:text-green"
    >
      {icon}
    </a>
  );
}
