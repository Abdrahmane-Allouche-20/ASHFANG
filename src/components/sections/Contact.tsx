"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Mail, Send } from "lucide-react";
import { PRODUCTS, SERVICES, SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const TOPICS = [...PRODUCTS.map((p) => `${p.name} demo`), ...SERVICES.map((s) => s.title), "Not sure yet"];

const NEXT_STEPS = [
  { title: "We reply fast", text: "A real engineer answers, in plain language." },
  { title: "Free assessment", text: "We learn what you're protecting and show you where you stand." },
  { title: "A clear next step", text: "A fixed scope and a plan — no sales runaround." },
];

const EMPTY = { name: "", email: "", company: "", message: "" };

/** `defaultTopic` preselects a topic chip, e.g. "PhishNode demo" on its product page. */
export default function Contact({ defaultTopic }: { defaultTopic?: string } = {}) {
  const [form, setForm] = useState(EMPTY);
  const [topics, setTopics] = useState<string[]>(defaultTopic && TOPICS.includes(defaultTopic) ? [defaultTopic] : []);
  const [sent, setSent] = useState(false);

  const toggleTopic = (t: string) =>
    setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${form.name || "the website"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company: ${form.company || "—"}`,
        `Interested in: ${topics.length ? topics.join(", ") : "—"}`,
        "",
        form.message,
      ].join("\n"),
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate pb-24 pt-36 sm:pt-44 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(45%_40%_at_22%_50%,rgba(139,92,246,0.10),transparent_70%)]" />
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 id="contact-title" className="heading-lg mt-5">
            Let&apos;s secure <span className="heading-dim">what matters.</span>
          </h1>
          <p className="lede mt-5 max-w-md">
            Tell us what you&apos;re protecting. We reply fast, in plain language, with a clear next
            step — no sales runaround.
          </p>

          <ol className="mt-10 space-y-5">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-muted">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{s.title}</p>
                  <p className="mt-0.5 text-[14px] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <EmailCard />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card relative p-6 sm:p-9">
            <span className="edge-light" />
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(52,211,153,0.35)] bg-[rgba(52,211,153,0.1)] text-ok">
                    <Check size={24} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em]">
                    Your message is ready to send
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                    We opened it in your email app — hit send and an engineer will get back to you.
                    Nothing opened? Email us at{" "}
                    <a href={`mailto:${SITE.email}`} className="text-fg underline decoration-line-strong underline-offset-4">
                      {SITE.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="btn btn-secondary btn-sm mt-8"
                  >
                    <ArrowLeft size={14} />
                    Back to the form
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={onSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="c-name">
                      <input
                        id="c-name"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="field"
                      />
                    </Field>
                    <Field label="Work email" htmlFor="c-email">
                      <input
                        id="c-email"
                        required
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="field"
                      />
                    </Field>
                  </div>
                  <Field label="Company" htmlFor="c-company" optional>
                    <input
                      id="c-company"
                      autoComplete="organization"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="field"
                    />
                  </Field>

                  <fieldset>
                    <legend className="mb-2.5 text-[13px] font-medium text-[#d6d6e2]">
                      What can we help with?
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => {
                        const on = topics.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleTopic(t)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-200",
                              on
                                ? "border-[rgba(167,139,250,0.6)] bg-[rgba(139,92,246,0.16)] text-fg"
                                : "border-line-strong bg-fill text-muted hover:border-[rgba(255,255,255,0.22)] hover:text-fg",
                            )}
                          >
                            {on && <Check size={12} className="text-violet-pale" strokeWidth={3} />}
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field label="Message" htmlFor="c-message">
                    <textarea
                      id="c-message"
                      required
                      rows={5}
                      placeholder="What are you protecting, and what's worrying you?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="field resize-none"
                    />
                  </Field>

                  <div className="flex flex-col-reverse items-center justify-between gap-4 pt-1 sm:flex-row">
                    <p className="text-[12.5px] text-subtle">Opens your email app with everything filled in.</p>
                    <button type="submit" className="btn btn-primary w-full sm:w-auto">
                      Send message
                      <Send size={15} className="btn-arrow" />
                    </button>
                  </div>
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
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-[13px] font-medium text-[#d6d6e2]">
        {label}
        {optional && <span className="text-[12px] font-normal text-subtle">Optional</span>}
      </label>
      {children}
    </div>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <div className="card mt-10 flex items-center gap-4 p-4 pr-3">
      <span className="icon-chip shrink-0" data-accent="cyan">
        <Mail size={16} />
      </span>
      <a href={`mailto:${SITE.email}`} className="min-w-0 flex-1">
        <span className="block text-[12px] text-subtle">Email an engineer directly</span>
        <span className="block truncate font-mono text-[13.5px] text-fg">{SITE.email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[12px] text-muted transition-colors hover:border-[rgba(255,255,255,0.22)] hover:text-fg"
      >
        {copied ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
