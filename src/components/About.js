import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import useProgressiveImg from "../utils/progressiveImg";
import smallImage from "../2014-Bierstadt-Lake-small.jpeg";
import largeImage from "../2014-Bierstadt-Lake.jpg";

const BlurredUpImage = () => {
  const [src, { blur }] = useProgressiveImg(smallImage, largeImage);
  return (
    <img
      src={src}
      alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
      className={
        blur
          ? "blur-lg transition-none absolute object-cover w-full h-full"
          : "blur-none filter ease-out duration-[2000ms] absolute object-cover w-full h-full"
      }
    />
  );
};

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  return (
    <main className="relative flex-grow h-screen">
      <BlurredUpImage />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Centered Content */}
      <div className="relative flex-grow flex flex-col justify-center items-center text-center py-4 lg:py-0 lg:px-8 mt-20 sm:mt-20">
        <section className="bg-gray-900 bg-opacity-75 rounded-b-lg p-4 md:p-6 lg:p-10 shadow-2xl w-full max-w-3xl h-screen sm:h-full">
          {/* Image and Loading State */}
          {author && author.authorImage ? (
            <img
              src={author ? urlFor(author.authorImage).url() : ""}
              className={`rounded-full ${
                author
                  ? "w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
                  : "w-24 h-24"
              } mx-auto mb-8`}
              alt={author ? author.name : "Loading..."}
            />
          ) : null}
          {/* Title and Name */}
          <h1 className="cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            {author ? (
              <>
                Hey there! I'm{" "}
                <span className="text-yellow-400">{author.name}</span>
              </>
            ) : (
              "Loading..."
            )}
          </h1>
          {/* Bio Content or Placeholder */}
          <div className="prose prose-sm sm:prose md:prose-lg lg:prose-xl text-white mx-auto max-w-full">
            {author ? (
              <BlockContent
                blocks={author.bio}
                projectId="46knf8eh"
                dataset="production"
              />
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
