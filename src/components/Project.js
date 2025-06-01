import React, { memo, useEffect, useState } from "react";
import { ArrowRight } from "phosphor-react"; // Importing an icon from phosphor-react
import sanityClient from "../client.js";

const ProjectCard = memo(({ project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative rounded-lg shadow leading-snug bg-indigo-50 border-l-8 border-yellow-400 sm:transition-all sm:duration-300 sm:transform sm:hover:scale-105 sm:hover:shadow-xl cursor-pointer p-6 flex flex-col group"
    aria-label={`View ${project.title} project`}
  >
    <div className="flex justify-between items-center mb-4">
      {/* Title and Arrow in the same row */}
      <h3 className="text-gray-900 text-3xl font-extrabold group-hover:text-yellow-600 transition-all duration-300">
        {project.title}
      </h3>
      {/* Phosphor Arrow Icon */}
      <ArrowRight
        size={28}
        className="flex sm:hidden text-yellow-500"
        aria-hidden="true"
      />
      <ArrowRight
        size={28}
        className="hidden sm:flex text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 translate-x-4 transition-all duration-300"
        aria-hidden="true"
      />
    </div>
    <div className="text-gray-500 text-sm">
      <span className="block mb-1">
        <strong className="font-semibold">Finished on:</strong>{" "}
        {new Date(project.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <span className="block mb-1">
        <strong className="font-semibold">Organization:</strong>{" "}
        {project.place}
      </span>
      <span className="block mb-1">
        <strong className="font-semibold">Type:</strong>{" "}
        {project.projectType}
      </span>
    </div>
    {/* Divider */}
    <div className="border-t border-gray-200 my-4"></div>
    <p className="text-lg text-gray-900 leading-relaxed">
      {project.description}
    </p>
  </a>
));

ProjectCard.displayName = 'ProjectCard';

const LoadingSkeleton = memo(() => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className="relative rounded-lg shadow bg-indigo-50 border-l-8 border-yellow-400 p-6 animate-pulse"
      >
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const Project = memo(() => {
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

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
      .catch((err) => {
        console.error('Error fetching project data:', err);
        setError(err);
      });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col h-screen">
        <main className="flex-grow overflow-y-auto py-12 px-2 sm:px-12 bg-gray-400 mt-20 mb-24">
          <section className="container mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Failed to load projects. Please try refreshing the page.</span>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable Content */}
      <main className="flex-grow overflow-y-auto py-12 px-2 sm:px-12 bg-gray-400 mt-20 mb-24">
        <section className="container mx-auto">
          <h1 className="text-5xl flex justify-center cursive">My Projects</h1>
          <h2 className="text-lg text-gray-700 flex justify-center mb-6">
            Check out what I've been building
          </h2>
          {projectData ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectData.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          ) : (
            <LoadingSkeleton />
          )}
        </section>
      </main>
    </div>
  );
});

Project.displayName = 'Project';

export default Project;
