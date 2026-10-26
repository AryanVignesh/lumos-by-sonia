import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-4xl">Studio not connected yet</h1>
        <p className="mt-4 text-muted">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to your environment variables (see the README), then
          redeploy to start editing content here.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
