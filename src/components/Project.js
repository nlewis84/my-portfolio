import React, { useEffect, useState } from "react";
import { ArrowRight } from "phosphor-react"; // Importing an icon from phosphor-react
import sanityClient from "../client.js";

export default function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"] | order(date desc) {
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
        }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Content */}
      <main className="flex-grow overflow-y-auto p-12 bg-indigo-100 mt-20 mb-24">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
          <h2 className="text-lg text-gray-700 flex justify-center mb-6">
            Check out what I've been building
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData &&
              projectData.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-lg shadow leading-snug bg-white border-l-8 border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer p-6 flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-center">
                    {/* Title and Arrow in the same row */}
                    <h3 className="text-gray-900 text-2xl font-bold mb-2 group-hover:text-yellow-500 transition-all duration-300">
                      {project.title}
                    </h3>
                    {/* Phosphor Arrow Icon */}
                    <ArrowRight
                      size={24}
                      className="text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 translate-x-4 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-4">
                      <span className="block mb-2">
                        <strong className="font-bold">Finished on:</strong>{" "}
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="block mb-2">
                        <strong className="font-bold">Organization:</strong>{" "}
                        {project.place}
                      </span>
                      <span className="block mb-2">
                        <strong className="font-bold">Type:</strong>{" "}
                        {project.projectType}
                      </span>
                    </div>
                    <p className="text-lg text-gray-900 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
