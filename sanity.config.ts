"use client";

/**
 * Sanity Studio configuration, mounted at /studio.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "lumos",
  title: "Lumos by Sonia",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Query playground for developers; hidden from the main menu labels otherwise.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
