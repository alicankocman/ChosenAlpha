import { createFileRoute } from "@tanstack/react-router";
import { LaunchExperience } from "@/components/launch-experience";
import { buildSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeoHead({
      path: "/",
      title: "ChosenAlpha — Break the Silence",
      description:
        "Something big is coming. ChosenAlpha, founded by Alican Koçman, Founder & CEO. The next chapter starts with you.",
    }),
  component: LaunchExperience,
});
