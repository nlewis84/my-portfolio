/**
 * Fetches all blog posts from Sanity and exports each as a .md file in blog-planning/
 * Run: node scripts/export-blog-posts.js
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ID = "46knf8eh";
const DATASET = "production";
const OUTPUT_DIR = path.join(__dirname, "..", "blog-planning");

const GROQ_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  body
}`;

/**
 * Converts Sanity Portable Text blocks to Markdown
 */
function portableTextToMarkdown(body) {
  if (!body || !Array.isArray(body)) return "";

  const lines = [];

  for (const block of body) {
    if (block._type === "code") {
      const lang = block.language || "";
      lines.push("");
      lines.push("```" + lang);
      lines.push(block.code || "");
      lines.push("```");
      lines.push("");
      continue;
    }

    if (block._type === "image" && block.asset) {
      const url = block.asset.url || block.asset._ref;
      const alt = block.alt || "";
      lines.push("");
      lines.push(`![${alt}](${url})`);
      lines.push("");
      continue;
    }

    if (block._type === "block" && block.children) {
      let text = "";
      for (const child of block.children) {
        if (child._type === "span" && child.text) {
          let spanText = child.text;
          if (child.marks && child.marks.length > 0) {
            for (const mark of child.marks) {
              if (typeof mark === "string") {
                if (mark === "strong") spanText = `**${spanText}**`;
                else if (mark === "em") spanText = `*${spanText}*`;
              }
            }
          }
          text += spanText;
        }
      }

      if (text.trim() === "") {
        lines.push("");
        continue;
      }

      const style = block.style || "normal";
      const listItem = block.listItem;

      if (listItem === "bullet") {
        lines.push("- " + text);
      } else if (style === "h1") {
        lines.push("");
        lines.push("# " + text);
      } else if (style === "h2") {
        lines.push("");
        lines.push("## " + text);
      } else if (style === "h3") {
        lines.push("");
        lines.push("### " + text);
      } else if (style === "h4") {
        lines.push("");
        lines.push("#### " + text);
      } else if (style === "blockquote") {
        lines.push("");
        lines.push("> " + text);
      } else {
        lines.push("");
        lines.push(text);
      }
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function main() {
  const query = encodeURIComponent(GROQ_QUERY);
  const url = `https://${PROJECT_ID}.api.sanity.io/v2026-01-01/data/query/${DATASET}?query=${query}`;

  console.log("Fetching blog posts from Sanity...");
  const res = await fetch(url);
  const data = await res.json();

  if (!data.result) {
    console.error("Failed to fetch:", data);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log("Created blog-planning/");
  }

  let count = 0;
  for (const post of data.result) {
    const slug = post.slug?.current || `post-${count}`;
    const title = post.title || "Untitled";
    const publishedAt = post.publishedAt || "";
    const bodyMarkdown = portableTextToMarkdown(post.body);

    const content = `# ${title}\n\nPublished: ${publishedAt}\n\n---\n\n${bodyMarkdown}\n`;

    const filename = `${slug}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, content, "utf8");
    console.log(`  wrote ${filename}`);
    count++;
  }

  console.log(`\nExported ${count} blog posts to blog-planning/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
