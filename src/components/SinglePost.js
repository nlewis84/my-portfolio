import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
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

  if (!singlePost)
    return (
      <main className="bg-indigo-100 min-h-screen p-12">
        <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg" />
      </main>
    );

  return (
    <main className="bg-indigo-100 min-h-screen pt-24 pb-24 md:px-12 md:pb-48">
      <article className="container shadow-lg mx-auto bg-gray-100 rounded-lg">
        <header className="relative">
          {/* Overlay on top of the header image */}
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-yellow-400 bg-opacity-80 rounded p-10 lg:p-16">
              <h1 className="cursive text-3xl sm:text-4xl lg:text-6xl mb-4">
                {singlePost.title}
              </h1>
              <div className="flex justify-center text-gray-900">
                <img
                  src={urlFor(singlePost.authorImage).url()}
                  alt={singlePost.name}
                  className="w-12 h-12 rounded-full"
                />
                <p className="cursive flex items-center pl-4 text-2xl lg:text-3xl">
                  {singlePost.name}
                </p>
              </div>
            </div>
          </div>
          <img
            src={singlePost.mainImage.asset.url}
            alt={singlePost.title}
            className="w-full h-64 sm:h-72 md:h-96 lg:h-[500px] object-cover"
          />
        </header>

        <div className="px-4 md:px-12 lg:px-48 py-5 lg:py-12 prose lg:prose-xl max-w-full">
          {/* Published Date */}
          <aside className="text-gray-500 italic">
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
