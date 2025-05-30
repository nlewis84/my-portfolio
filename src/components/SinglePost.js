import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const serializers = {
  types: {
    code: (props) => (
      <CodeBlock code={props.node.code} language={props.node.language} />
    ),
  },
};

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
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
        }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

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
    <main className="bg-gray-400 min-h-screen pt-24 pb-24 md:px-12 md:pb-48">
      <article className="container shadow-lg mx-auto bg-indigo-50 rounded-lg">
        <header className="relative">
          {/* Overlay on top of the header image */}
          <div className="absolute h-full w-full flex flex-col items-center justify-center p-8">
            <div className="bg-yellow-400 bg-opacity-80 rounded p-10 lg:p-16">
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
                <p className="cursive flex items-center pl-4 text-lg sm:text-xl text-gray-800 lg:text-3xl">
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
            blocks={singlePost.body}
            projectId="46knf8eh"
            dataset="production"
            serializers={serializers}
          />
        </div>
      </article>
    </main>
  );
}
