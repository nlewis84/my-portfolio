import { createClient } from "@sanity/client";

export default createClient({
  projectId: "46knf8eh",
  dataset: "production",
  apiVersion: "2024-03-19",
  useCdn: true,
});
