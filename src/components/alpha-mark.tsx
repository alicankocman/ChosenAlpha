import { useId } from "react";

const alphaPath = "M158 64C96 64 48 112 48 181c0 62 31 99 78 99 36 0 64-21 86-55l14 29c10 21 23 28 42 24l20-5-2-18c-20 2-28-9-38-30l-18-41 52-114h-39l-33 75C198 89 183 64 158 64Zm-8 33c24 0 36 30 46 77-18 42-42 73-66 73-29 0-44-25-44-66 0-47 28-84 64-84Z";

export function AlphaMark({ fragment = false }: { fragment?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={fragment ? "alpha-svg fragment-svg" : "alpha-svg"} viewBox="0 0 340 340" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-face`} x1="72" y1="78" x2="249" y2="282" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--alpha-highlight)" />
          <stop offset=".27" stopColor="var(--alpha-light)" />
          <stop offset=".5" stopColor="var(--primary)" />
          <stop offset=".72" stopColor="var(--alpha-highlight)" />
          <stop offset="1" stopColor="var(--alpha-shadow)" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="73" y1="91" x2="273" y2="285" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--alpha-light)" /><stop offset=".5" stopColor="var(--alpha-shadow)" /><stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      {!fragment && <path d={alphaPath} fill="var(--primary)" filter={`url(#${id}-glow)`} className="alpha-glow" />}
      <path d={alphaPath} transform="translate(5 7)" fill="var(--alpha-shadow)" stroke={`url(#${id}-edge)`} strokeWidth="3" fillRule="evenodd" />
      <path d={alphaPath} fill={`url(#${id}-face)`} stroke="var(--alpha-light)" strokeWidth=".8" fillRule="evenodd" />
    </svg>
  );
}