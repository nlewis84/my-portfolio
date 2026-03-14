import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

export default function Posts() {
  const [postData, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
            title,
            slug,
            publishedAt,
            mainImage {
                asset->{
                    _id,
                    url
                },
                alt
            }
        }`,
      )
      .then((data) => setPost(data))
      .catch((err) => {
        console.error("Error fetching post data:", err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <main className="grow overflow-y-auto pt-6 pb-12 px-2 sm:px-12 bg-gray-400 mt-[72px] sm:mt-24 mb-[108px]">
          <section className="container mx-auto">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">
                {" "}
                Failed to load posts. Please try refreshing the page.
              </span>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Content */}
      <main className="grow overflow-y-auto pt-6 pb-12 px-2 sm:px-12 bg-gray-400 mt-[72px] sm:mt-24 mb-[108px]">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center cursive animate-fade-in">My Blog</h1>
          <h2 className="text-lg text-gray-700 flex justify-center mb-6 animate-fade-in-delay-1">
            Check out what I'm writing about
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postData &&
              postData.map((post, index) => (
                <article
                  key={index}
                  className="animate-fade-in-stagger min-h-64"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    to={"/post/" + post.slug.current}
                    className="block h-full"
                  >
                    <span className="block h-64 relative rounded-lg shadow-sm leading-snug bg-indigo-50 border-l-8 border-yellow-400 sm:transition-all sm:duration-300 sm:transform sm:hover:scale-105 sm:hover:shadow-xl">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        loading="lazy"
                        className="w-full h-full rounded-r object-cover absolute"
                        width="400"
                        height="256"
                      />
                      <span className="relative h-full flex justify-end items-end pr-4 pb-4">
                        <h3 className="text-gray-800 text-lg font-bold px-4 py-4 bg-yellow-400 bg-opacity-90 w-full rounded-r-md">
                          {post.title}
                          <span className="flex justify-end text-sm font-normal">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </h3>
                      </span>
                    </span>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
