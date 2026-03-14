import React, { memo, useEffect, useState } from "react";
import sanityClient from "../client.js";
import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

const AuthorImage = memo(({ author }) => {
  const imageClasses =
    "rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-8 transition-transform duration-300 hover:scale-105";

  if (!author?.authorImage) return null;

  return (
    <img
      src={urlFor(author.authorImage).url()}
      className={`${imageClasses} animate-fade-in`}
      alt={author.name}
      loading="eager"
      fetchPriority="high"
      width="160"
      height="160"
    />
  );
});

AuthorImage.displayName = "AuthorImage";

const builder = createImageUrlBuilder(sanityClient);
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
        }`,
      )
      .then((data) => setAuthor(data[0]))
      .catch((err) => {
        console.error("Error fetching author data:", err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <main className="relative flex flex-col min-h-screen">
        <div className="relative flex flex-col justify-start items-center grow text-left pt-4 pb-8 sm:pb-4 px-2 sm:px-4 lg:px-8 mt-[72px] sm:mt-24">
          <section className="bg-gray-900 bg-opacity-75 rounded-b-lg p-4 md:p-6 lg:p-10 shadow-2xl w-full max-w-3xl">
            <h1 className="text-red-500 text-2xl mb-4">
              Error Loading Content
            </h1>
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
      <div className="relative flex flex-col justify-start items-center grow text-left pt-4 pb-16 sm:pb-4 px-2 sm:px-4 lg:px-8 mt-[72px] sm:mt-24">
        <section
          className="bg-gray-900 bg-opacity-75 rounded-b-lg p-4 md:p-6 lg:p-10 shadow-2xl w-full max-w-3xl min-h-96"
          role="article"
        >
          <AuthorImage author={author} />

          {/* Title and Name */}
          {author && (
            <>
              <h1 className="cursive text-4xl md:text-6xl lg:text-7xl text-indigo-50 mb-4 animate-fade-in-delay-1">
                Hey there! I'm{" "}
                <span className="text-yellow-400">{author.name}</span>
              </h1>

              <div className="prose text-lg lg:text-xl text-indigo-50 pt-4 leading-relaxed animate-fade-in-delay-2">
                <PortableText
                  value={author.bio}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
});

About.displayName = "About";

export default About;
