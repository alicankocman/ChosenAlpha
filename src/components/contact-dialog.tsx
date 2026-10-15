import { useState, type FormEvent } from "react";
import { Check, Send, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitWeb3Form } from "@/lib/forms";

const TOPICS = ["Partnership", "Investment", "Press", "Careers", "Other"] as const;
type Topic = (typeof TOPICS)[number];
type Status = "idle" | "submitting" | "success" | "error";

export function ContactDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<Topic>("Partnership");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function reset() {
    setName(""); setEmail(""); setTopic("Partnership"); setMessage(""); setStatus("idle");
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next && status === "success") reset();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    // Honeypot: real users never fill this hidden field.
    if ((form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked) return;
    setStatus("submitting");
    try {
      await submitWeb3Form({
        from_name: "ChosenAlpha Contact",
        subject: `New contact · ${topic} — ${name}`,
        name, email, topic, message,
      });
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  const canSubmit = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && message.trim().length > 4;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="contact-dialog" aria-describedby="contact-description">
        {status === "success" ? (
          <div className="contact-success" role="status">
            <span className="contact-success-icon"><Check size={22} /></span>
            <DialogTitle className="contact-title">MESSAGE RECEIVED</DialogTitle>
            <DialogDescription id="contact-description" className="contact-description">
              Thank you, {name.split(" ")[0] || "friend"}. We read every message and will get back to you shortly.
            </DialogDescription>
            <button type="button" className="cinematic-button contact-close" onClick={() => handleOpenChange(false)}>CLOSE</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <DialogHeader className="contact-header">
              <p className="contact-eyebrow">GET IN TOUCH</p>
              <DialogTitle className="contact-title">LET'S START A <span>CONVERSATION.</span></DialogTitle>
              <DialogDescription id="contact-description" className="contact-description">
                Partnerships, investment, press or just curiosity — tell us what's on your mind.
              </DialogDescription>
            </DialogHeader>

            <input type="checkbox" name="botcheck" className="contact-honeypot" tabIndex={-1} aria-hidden="true" />

            <div className="contact-grid">
              <label className="contact-field">
                <span className="contact-label">NAME</span>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required className="contact-input" />
              </label>
              <label className="contact-field">
                <span className="contact-label">EMAIL</span>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" required className="contact-input" />
              </label>
            </div>

            <fieldset className="contact-field">
              <legend className="contact-label">TOPIC</legend>
              <div className="contact-topics" role="radiogroup">
                {TOPICS.map((t) => (
                  <label key={t} className={t === topic ? "contact-topic is-active" : "contact-topic"}>
                    <input type="radio" name="topic" value={t} checked={t === topic} onChange={() => setTopic(t)} className="sr-only" />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="contact-field">
              <span className="contact-label">MESSAGE</span>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us a little about what you have in mind…" rows={4} required className="contact-input contact-textarea" />
            </label>

            {status === "error" && (
              <p className="contact-error" role="alert"><AlertCircle size={14} /> Something went wrong. Please try again.</p>
            )}

            <div className="contact-actions">
              <p className="contact-privacy">We only use your details to reply to you.</p>
              <button type="submit" className="contact-submit" disabled={!canSubmit || status === "submitting"}>
                {status === "submitting" ? "SENDING…" : <><Send size={13} /> SEND MESSAGE</>}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
