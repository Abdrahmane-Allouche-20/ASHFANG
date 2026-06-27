"use client";

import { useState } from "react";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-violet/60";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">04 / Get in touch</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s secure <span className="text-gradient">what matters.</span>
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Tell us what you&apos;re protecting. We reply fast, in plain language, with a clear next step —
            no sales runaround.
          </p>

          <a
            href={`mailto:${SITE.email}`}
            className="mt-8 inline-flex items-center gap-3 rounded-xl glass-panel px-5 py-4 transition-colors hover:border-violet/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet/20 to-cyan/10 ring-1 ring-white/10">
              <Mail size={18} className="text-cyan" />
            </span>
            <span>
              <span className="block text-xs text-muted">Email us directly</span>
              <span className="font-mono text-sm">{SITE.email}</span>
            </span>
            <ArrowUpRight size={16} className="ml-auto text-muted" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="ring-gradient rounded-2xl glass-panel p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </div>
            <input
              placeholder="Company (optional)"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={`${field} mt-4`}
            />
            <textarea
              required
              rows={5}
              placeholder="What do you need to secure?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} mt-4 resize-none`}
            />
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3.5 text-sm font-medium text-[#07070b] transition-shadow hover:shadow-glow"
            >
              Send message <Send size={15} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
