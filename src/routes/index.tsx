import { createFileRoute } from "@tanstack/react-router";
import { LaunchExperience } from "@/components/launch-experience";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ChosenAlpha — Break the Silence" },
    { name: "description", content: "Something big is coming. ChosenAlpha, founded by Alican Koçman, Founder & CEO. The next chapter starts with you." },
    { property: "og:title", content: "ChosenAlpha — Something Big Is Coming" },
    { property: "og:description", content: "We're building something worth waiting for. Break the silence and discover ChosenAlpha." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: LaunchExperience,
});
