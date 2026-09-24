import { createFileRoute } from "@tanstack/react-router";
import { LearningPlatform } from "@/components/learning-platform";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "HTML & CSS Interactive Notes — Learn by Building" },
    { name: "description", content: "Learn modern HTML and CSS with searchable notes, editable examples, live previews, and progress tracking." },
    { property: "og:title", content: "HTML & CSS Interactive Notes" },
    { property: "og:description", content: "A complete interactive HTML and CSS learning reference for beginners." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <LearningPlatform />;
}
