import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, RotateCcw, Mail, Check, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlphaMark } from "@/components/alpha-mark";
import { CosmicBackground } from "@/components/cosmic-background";
import { ContactDialog } from "@/components/contact-dialog";
import { submitWeb3Form } from "@/lib/forms";

type Phase = "silent" | "breaking" | "revealed";
const fragments = Array.from({ length: 20 }, (_, i) => {
  const column = i % 5;
  const row = Math.floor(i / 5);
  return {
    clipPath: `polygon(${column * 20}% ${row * 25}%, ${column * 20 + 23}% ${row * 25}%, ${column * 20 + 18}% ${row * 25 + 27}%, ${column * 20 - 2}% ${row * 25 + 23}%)`,
    "--fragment-x": `${(column - 2) * 130 + (i % 2 ? 45 : -45)}px`,
    "--fragment-y": `${(row - 1.5) * 145}px`,
    "--fragment-rotation": `${(i % 2 ? 1 : -1) * (35 + i * 13)}deg`,
    "--fragment-delay": `${(i % 4) * 18}ms`,
  } as CSSProperties;
});

export function LaunchExperience() {
  const [phase, setPhase] = useState<Phase>("silent");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (phase === "revealed") revealHeading.current?.focus({ preventScroll: true });
  }, [phase]);

  function breakSilence() {
    if (phase !== "silent") return;
    setPhase("breaking");
    window.dispatchEvent(new Event("cosmic-impact"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => setPhase("revealed"), reduced ? 80 : 1350);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    try {
      await submitWeb3Form({ email, from_name: "ChosenAlpha Waitlist", subject: "New Waitlist Signup" });
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Waitlist signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={`launch-experience phase-${phase}`}>
      <CosmicBackground />
      <header className="launch-header">
        <a href="/" className="wordmark" aria-label="ChosenAlpha home">CHOSEN<span>ALPHA</span><span className="brand-period">.</span></a>
        <span className="header-symbol" aria-hidden="true">α</span>
        <div className="launch-label"><span className="status-dot" /> A NEW ERA AWAITS <ArrowUpRight size={13} /></div>
      </header>

      <section className="cinematic-stage" aria-label="ChosenAlpha launch">
        <div className="orbital-system" aria-hidden="true">
          <div className="orbit orbit-outer" /><div className="orbit orbit-inner" />
          <span className="orbit-cross cross-top">+</span><span className="orbit-cross cross-bottom">+</span>
          <span className="orbit-coordinate">CA / 001</span>
        </div>
        <div className="silent-scene" aria-hidden={phase === "revealed"}>
          {/* Crawlers never trigger the click, so the page needs a real H1 before the reveal. */}
          {phase !== "revealed" && <h1 className="sr-only">ChosenAlpha — Something big is coming</h1>}
          <div className="scene-eyebrow">THE NEXT CHAPTER STARTS WITH YOU</div>
          <div className="symbol-space">
            <Button variant="symbol" size="stage" aria-label="Break the silence" disabled={phase !== "silent"} onClick={breakSilence}>
              <AlphaMark />
            </Button>
            {phase === "breaking" && <div className="shatter-layer" aria-hidden="true">
              <div className="energy-flash" /><div className="shockwave" /><div className="cosmic-shockwave" />
              {fragments.map((style, i) => <div key={i} className="glass-fragment" style={style}><AlphaMark fragment /></div>)}
              {Array.from({ length: 32 }, (_, i) => <i className="energy-particle" key={i} style={{ "--particle-x": `${Math.cos(i * 2.4) * (170 + i * 8)}px`, "--particle-y": `${Math.sin(i * 2.4) * (170 + i * 8)}px`, "--fragment-delay": `${i % 5 * 20}ms` } as CSSProperties} />)}
            </div>}
          </div>
          <div className="tap-invitation"><span className="invitation-line" /><span>TAP TO BREAK THE SILENCE</span><span className="invitation-line" /></div>
          <p className="silent-caption">Not just another beginning.</p>
        </div>

        {phase === "revealed" && <div className="reveal-scene">
          <div className="reveal-mark"><AlphaMark /></div>
          <p className="reveal-eyebrow">THE SILENCE WAS ONLY THE BEGINNING</p>
          <h1 ref={revealHeading} tabIndex={-1}>SOMETHING BIG<br />IS <span>COMING.</span></h1>
          <p className="reveal-description">We're building something worth waiting for.</p>
          <div className="reveal-divider" />
          <p className="coming-soon">CHOSENALPHA <span>—</span> COMING SOON</p>
          <p className="founder">Founded by <strong>Alican Koçman</strong> <span>·</span> Founder &amp; CEO</p>
          
          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="waitlist-form">
              <div className="waitlist-input-wrapper">
                <Mail className="waitlist-icon" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                  className="waitlist-input"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting || !email}
                  className="waitlist-submit"
                >
                  {isSubmitting ? "..." : "Notify Me"}
                </button>
              </div>
              <p className="waitlist-hint">Get notified when we launch</p>
            </form>
          ) : (
            <div className="waitlist-success">
              <Check size={20} />
              <span>You're on the list! Check your email.</span>
            </div>
          )}
          
          <div className="reveal-actions">
            <Button variant="cinematic" className="cinematic-button-primary" onClick={() => setContactOpen(true)}><MessageSquare size={14} /> GET IN TOUCH</Button>
            <Button variant="cinematic" onClick={() => setPhase("silent")}><RotateCcw size={14} /> REPLAY THE MOMENT</Button>
          </div>
        </div>}
      </section>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <footer className="launch-footer">
        <div className="footer-status"><span className="status-dot" /><span>{phase === "revealed" ? "STAY TUNED" : "BEFORE THE BEGINNING"}</span></div>
        <div className="footer-center">INDEPENDENT VISION. LIMITLESS POSSIBILITIES.</div>
        <span className="footer-edition">© CHOSENALPHA</span>
      </footer>
    </main>
  );
}