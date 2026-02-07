import React, { memo, useEffect, useState } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const AuthorImage = memo(({ author }) => {
  // Always reserve space to prevent CLS when image loads
  const imageClasses = "rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-8 transition-transform duration-300 hover:scale-105";

  if (!author?.authorImage) {
    return (
      <div
        className={`${imageClasses} bg-gray-700 animate-pulse`}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={urlFor(author.authorImage).url()}
      className={`${imageClasses} animate-fade-in`}
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
      {/* Background rendered by App (shared with Home) */}

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
              <span className="animate-fade-in-delay-1">
                Hey there! I'm{" "}
                <span className="text-yellow-400">{author.name}</span>
              </span>
            ) : (
              <span className="animate-pulse">&nbsp;</span>
            )}
          </h1>

          {/* Bio Content - min-height prevents CLS when BlockContent loads */}
          <div className="prose text-lg lg:text-xl text-indigo-50 pt-4 leading-relaxed min-h-[12rem]">
            {author ? (
              <div className="animate-fade-in-delay-2">
                <BlockContent
                  blocks={author.bio}
                  projectId="46knf8eh"
                  dataset="production"
                />
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
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
