import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Prism from "prismjs";
import { Copy, Check } from "phosphor-react";

import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre>
        <button
          className={`copy-button absolute top-2 right-2 flex items-center space-x-2 bg-gray-600 text-white text-xs px-3 py-1 rounded transition duration-300 ${
            isCopied ? "bg-green-500" : "bg-gray-600"
          }`}
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy code</span>
            </>
          )}
        </button>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

let inlineCodeKeyCounter = 0;

function processBlocksForInlineCode(blocks) {
  if (!blocks) return blocks;
  return blocks.map((block) => {
    if (block._type !== "block" || !block.children) return block;

    const newChildren = [];
    block.children.forEach((child) => {
      if (child._type !== "span" || !child.text) {
        newChildren.push(child);
        return;
      }

      // Strip backticks from spans that already carry a code mark
      if (child.marks?.includes("code") && child.text.includes("`")) {
        newChildren.push({
          ...child,
          text: child.text.replace(/`/g, ""),
        });
        return;
      }

      if (!child.text.includes("`")) {
        newChildren.push(child);
        return;
      }

      const parts = child.text.split(/`([^`]+)`/);
      if (parts.length === 1) {
        newChildren.push(child);
        return;
      }

      parts.forEach((part, i) => {
        if (!part) return;
        newChildren.push({
          ...child,
          _key: `${child._key || "ic"}-${inlineCodeKeyCounter++}`,
          text: part,
          marks: i % 2 === 1 ? [...(child.marks || []), "code"] : child.marks,
        });
      });
    });

    return { ...block, children: newChildren };
  });
}

const serializers = {
  types: {
    code: (props) => (
      <CodeBlock code={props.node.code} language={props.node.language} />
    ),
  },
  marks: {
    code: ({ children }) => <code className="inline-code">{children}</code>,
  },
};

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    setPrevPost(null);
    setNextPost(null);
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image,
        }`,
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (!singlePost?.publishedAt) return;
    const publishedAt = singlePost.publishedAt;
    Promise.all([
      sanityClient.fetch(
        `*[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc)[0]{ title, "slug": slug.current }`,
        { publishedAt },
      ),
      sanityClient.fetch(
        `*[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc)[0]{ title, "slug": slug.current }`,
        { publishedAt },
      ),
    ])
      .then(([prev, next]) => {
        setPrevPost(prev);
        setNextPost(next);
      })
      .catch(console.error);
  }, [singlePost?.publishedAt]);

  useEffect(() => {
    if (singlePost) {
      Prism.highlightAll();
    }
  }, [singlePost]);

  if (!singlePost)
    return (
      <main className="bg-gray-400 min-h-screen p-12">
        <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg" />
      </main>
    );

  return (
    <main className="bg-gray-400 min-h-screen mt-[72px] sm:mt-24 mb-[108px] md:px-12">
      <article className="container shadow-lg mx-auto bg-indigo-50 rounded-lg animate-fade-in">
        <header className="relative">
          {/* Overlay on top of the header image */}
          <div className="absolute h-full w-full flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8">
            <div className="bg-yellow-400 bg-opacity-80 rounded p-4 sm:p-8 lg:p-16">
              <h1 className="cursive text-center text-4xl sm:text-5xl lg:text-7xl mb-4">
                {singlePost.title}
              </h1>
              <div className="flex justify-center text-gray-900 items-center">
                <img
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                  className="w-10 h-10 rounded-full"
                  loading="eager"
                  width="40"
                  height="40"
                />
                <p className="cursive flex items-center pl-4 text-lg sm:text-xl text-gray-800">
                  {singlePost.name}
                </p>
              </div>
            </div>
          </div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
            className="w-full h-64 sm:h-72 md:h-96 lg:h-[500px] object-cover"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="500"
          />
        </header>

        <div className="px-4 md:px-12 lg:px-48 py-5 lg:py-12 prose lg:prose-xl max-w-full">
          {/* Published Date */}
          <aside className="text-gray-500 italic text-sm">
            Published on {new Date(singlePost.publishedAt).toLocaleDateString()}
          </aside>

          {/* Main Content Block */}
          <BlockContent
            blocks={processBlocksForInlineCode(singlePost.body)}
            projectId="46knf8eh"
            dataset="production"
            serializers={serializers}
          />
        </div>

        {/* Prev/Next Post Navigation */}
        {(prevPost || nextPost) && (
          <nav
            className="px-4 md:px-12 lg:px-48 py-8 lg:py-12 border-t border-gray-200"
            aria-label="Post navigation"
          >
            <div
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${
                prevPost && nextPost
                  ? "justify-between"
                  : nextPost
                    ? "justify-end"
                    : "justify-start"
              }`}
            >
              {prevPost && (
                <Link
                  to={"/post/" + prevPost.slug}
                  className="max-w-md rounded shadow border-l-8 border-yellow-400 bg-indigo-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <span className="text-gray-500 text-sm block mb-1">
                    Previous
                  </span>
                  <span className="cursive text-gray-800 text-xl lg:text-2xl font-bold">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  to={"/post/" + nextPost.slug}
                  className="max-w-md rounded shadow border-l-8 border-yellow-400 bg-indigo-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg text-right sm:ml-auto"
                >
                  <span className="text-gray-500 text-sm block mb-1">Next</span>
                  <span className="cursive text-gray-800 text-xl lg:text-2xl font-bold">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
    </main>
  );
}
