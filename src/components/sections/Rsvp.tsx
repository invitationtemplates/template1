import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { submitRsvp, type RsvpResult } from "../../lib/rsvp";
import { FloralSide } from "../ui/Decor";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

type Status = "idle" | "sending" | "done" | "error";

const initial = { name: "", phone: "", attending: "yes" as "yes" | "no", guests: "1", dietary: "", message: "" };

const doneText: Record<RsvpResult["channel"], string> = {
  endpoint: "Your reply has been received. We look forward to celebrating with you.",
  whatsapp: "WhatsApp has opened with your reply ready to send. Please press send there to confirm.",
  none: "RSVP is not connected to a service yet, so this reply was not sent. Please contact the family directly.",
};

const label = "mb-1.5 block font-text text-[13.5px] font-semibold text-cocoa";
const errorText = "mt-1 text-[12.5px] text-[#a3324f]";

/** Single-column RSVP form with large fields; replies go through lib/rsvp.ts. */
export default function Rsvp({ rsvp }: { rsvp: InvitationConfig["rsvp"] }) {
  const uid = useId();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RsvpResult | null>(null);

  const set = (k: keyof typeof initial, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    const digits = form.phone.replace(/\D/g, "");
    if (form.phone && (digits.length < 7 || digits.length > 15)) e.phone = "Please enter a valid phone number";
    setErrors(e);
    if (e.name || e.phone) return;

    setStatus("sending");
    try {
      const res = await submitRsvp(
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          attending: form.attending === "yes",
          guests: form.attending === "yes" ? Number(form.guests) : 0,
          dietary: form.dietary.trim(),
          message: form.message.trim(),
          submittedAt: new Date().toISOString(),
        },
        rsvp.whatsappNumber,
      );
      setResult(res);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const id = (n: string) => `${uid}-${n}`;

  return (
    <section id="rsvp" className="card-section bg-gradient-to-b from-[#FDEFE3] to-[#F9DECF]">
      <FloralSide className="top-4 w-[10%]" />
      <FloralSide flip className="top-4 w-[10%]" />
      <SectionTitle eyebrow="Kindly reply">{rsvp.heading}</SectionTitle>

      <Reveal className="relative mx-auto mt-7 max-w-[340px]">
        <AnimatePresence mode="wait">
          {status === "done" && result ? (
            <motion.div
              key="done"
              role="status"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-gold-soft bg-white/80 px-6 py-10 text-center shadow-card"
            >
              <p className="font-heading text-[28px] italic text-cocoa">Thank you!</p>
              <p className="mt-3 font-text text-[15px] leading-relaxed text-cocoa-soft">{doneText[result.channel]}</p>
              <button
                type="button"
                className="btn-outline mt-5"
                onClick={() => {
                  setForm(initial);
                  setStatus("idle");
                }}
              >
                Send another reply
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-4 rounded-3xl bg-white/55 p-5 shadow-soft">
              <div>
                <label htmlFor={id("name")} className={label}>
                  Your Name <span className="text-gold">*</span>
                </label>
                <input id={id("name")} className="field" placeholder="Enter your name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-e") : undefined} />
                {errors.name && (
                  <p id={id("name-e")} className={errorText}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={id("phone")} className={label}>
                  Phone Number
                </label>
                <input id={id("phone")} type="tel" inputMode="tel" className="field" placeholder="Enter your phone" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-e") : undefined} />
                {errors.phone && (
                  <p id={id("phone-e")} className={errorText}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className={label}>
                  Will you be attending? <span className="text-gold">*</span>
                </legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["yes", "no"] as const).map((v) => (
                    <label
                      key={v}
                      className={`cursor-pointer rounded-xl border px-3 py-3 text-center font-text text-[14px] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold ${
                        form.attending === v ? "border-gold bg-gold text-white shadow-soft" : "border-gold-soft bg-white/80 text-cocoa"
                      }`}
                    >
                      <input type="radio" name={id("attending")} value={v} checked={form.attending === v} onChange={() => set("attending", v)} className="sr-only" />
                      {v === "yes" ? "Accept with pleasure" : "Decline with regret"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <AnimatePresence initial={false}>
                {form.attending === "yes" && (
                  <motion.div key="guests" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <label htmlFor={id("guests")} className={label}>
                      Number of Guests <span className="text-gold">*</span>
                    </label>
                    <select id={id("guests")} className="field" value={form.guests} onChange={(e) => set("guests", e.target.value)}>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor={id("dietary")} className={label}>
                  Dietary Requirements
                </label>
                <input id={id("dietary")} className="field" placeholder="Any special dietary needs?" value={form.dietary} onChange={(e) => set("dietary", e.target.value)} />
              </div>

              <div>
                <label htmlFor={id("message")} className={label}>
                  Message (Optional)
                </label>
                <textarea id={id("message")} rows={3} className="field resize-none" placeholder="Your message to the couple..." value={form.message} onChange={(e) => set("message", e.target.value)} />
              </div>

              {status === "error" && (
                <p role="alert" className="text-center text-[14px] text-[#a3324f]">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={status === "sending"} className="btn-gold w-full py-3.5 text-[15px]">
                <Send className="h-4 w-4" aria-hidden /> {status === "sending" ? "Sending…" : "Submit RSVP"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
