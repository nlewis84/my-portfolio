import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

export default function Posts() {
  const [postData, setPost] = useState(null);

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
        }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Content */}
      <main className="flex-grow overflow-y-auto py-12 px-2 sm:px-12 bg-indigo-100 mt-20 mb-24">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center cursive">My Blog</h1>
          <h2 className="text-lg text-gray-700 flex justify-center mb-6">
            Check out what I'm writing about
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postData &&
              postData.map((post, index) => (
                <article key={index}>
                  <Link to={"/post/" + post.slug.current}>
                    <span className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                      <img
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt}
                        className="w-full h-full rounded-r object-cover absolute"
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
                              }
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
