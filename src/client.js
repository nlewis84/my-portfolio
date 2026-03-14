import { createClient } from "@sanity/client";

export default createClient({
  projectId: "46knf8eh",
  dataset: "production",
  apiVersion: "2026-03-14",
  useCdn: true,
});
