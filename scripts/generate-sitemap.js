const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream"); // <-- Add this to fix the error
const fs = require("fs");

// Define your links here
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.7 },
  { url: "/projects", changefreq: "weekly", priority: 0.8 },
  { url: "/blog", changefreq: "daily", priority: 0.9 },
  // Add more pages
];

const stream = new SitemapStream({ hostname: "https://nathanlewis.dev" });

// Create a readable stream from the links array
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  fs.writeFileSync("public/sitemap.xml", data.toString()); // Save to the public folder
});
