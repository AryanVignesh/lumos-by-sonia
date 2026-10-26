import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";

// Let the Sanity CLI (e.g. `npm run seed:import`) read the same .env.local as Next.js.
loadEnvConfig(process.cwd());

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
