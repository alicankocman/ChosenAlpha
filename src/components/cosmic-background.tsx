import { memo } from "react";
import { Meteors } from "@/components/ui/meteors";

/** Clean cosmic background: just meteors */
export const CosmicBackground = memo(function CosmicBackground() {
  return (
    <div className="cosmos" aria-hidden="true">
      <Meteors number={30} />
      <div className="cosmos-vignette" />
    </div>
  );
});
