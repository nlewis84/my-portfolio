import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "studio",

  projectId: "46knf8eh",
  dataset: "production",

  plugins: [structureTool(), visionTool(), codeInput(), markdownSchema()],

  schema: {
    types: schemaTypes,
  },
});
