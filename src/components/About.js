import React, { memo, useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import useProgressiveImg from "../utils/progressiveImg";
import smallImage from "../2014-Bierstadt-Lake-small.jpeg";
import largeImage from "../2014-Bierstadt-Lake.jpg";

const BlurredUpImage = memo(() => {
  const [src, { blur }] = useProgressiveImg(smallImage, largeImage);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-indigo-700">
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
      loading="eager"
      fetchPriority="high"
      onError={() => setError(true)}
      className={
        blur
          ? "blur-lg transition-none absolute object-cover w-full h-full"
          : "blur-none filter ease-out duration-1000 absolute object-cover w-full h-full"
      }
      width="1920"
      height="1080"
    />
  );
});

BlurredUpImage.displayName = 'BlurredUpImage';

const AuthorImage = memo(({ author }) => {
  if (!author?.authorImage) return null;

  return (
    <img
      src={urlFor(author.authorImage).url()}
      className="rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-8 transition-transform duration-300 hover:scale-105"
      alt={author.name}
      loading="eager"
      width="160"
      height="160"
    />
  );
});

AuthorImage.displayName = 'AuthorImage';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const About = memo(() => {
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        console.error('Error fetching author data:', err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <main className="relative flex flex-col min-h-screen">
        <div className="relative flex flex-col justify-start items-center flex-grow text-left py-4 lg:px-8 mt-20">
          <section className="bg-gray-900 bg-opacity-75 rounded-b-lg p-4 md:p-6 lg:p-10 shadow-2xl w-full max-w-3xl">
            <h1 className="text-red-500 text-2xl mb-4">Error Loading Content</h1>
            <p className="text-indigo-50">Please try refreshing the page.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col min-h-screen">
      <BlurredUpImage />
      {/* Background Overlay - Using CSS gradient for better performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>

      {/* Centered Content */}
      <div className="relative flex flex-col justify-start items-center flex-grow text-left py-4 lg:px-8 mt-20">
        <section 
          className="bg-gray-900 bg-opacity-75 rounded-b-lg p-4 md:p-6 lg:p-10 shadow-2xl w-full max-w-3xl"
          role="article"
        >
          <AuthorImage author={author} />
          
          {/* Title and Name */}
          <h1 className="cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-indigo-50 mb-4">
            {author ? (
              <>
                Hey there! I'm{" "}
                <span className="text-yellow-400">{author.name}</span>
              </>
            ) : (
              <span className="animate-pulse">Loading...</span>
            )}
          </h1>

          {/* Bio Content */}
          <div className="prose text-lg lg:text-xl text-indigo-50 pt-4 leading-relaxed">
            {author ? (
              <BlockContent
                blocks={author.bio}
                projectId="46knf8eh"
                dataset="production"
              />
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
});

About.displayName = 'About';

export default About;
