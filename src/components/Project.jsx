import { memo, useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import sanityClient from "../client.js";

const ProjectCard = memo(({ project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative rounded-lg shadow-sm leading-snug bg-indigo-50 border-l-8 border-yellow-400 sm:transition-all sm:duration-300 sm:transform sm:hover:scale-105 sm:hover:shadow-xl cursor-pointer p-6 flex flex-col group min-h-80 h-full"
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
        className="hidden sm:flex text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300"
        aria-hidden="true"
      />
    </div>
    <div className="text-gray-500 text-sm">
      {new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      {" · "}
      {project.place}
    </div>
    {/* Divider */}
    <div className="border-t border-gray-200 my-4"></div>
    <p className="text-base text-gray-700 leading-relaxed flex-1">
      {project.description}
    </p>
  </a>
));

ProjectCard.displayName = "ProjectCard";

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
        }`,
      )
      .then((data) => setProjectData(data))
      .catch((err) => {
        console.error("Error fetching project data:", err);
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
                Failed to load projects. Please try refreshing the page.
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
          <h1 className="text-5xl flex justify-center cursive animate-fade-in">
            My Projects
          </h1>
          <h2 className="text-lg text-gray-700 flex justify-center mb-6 animate-fade-in-delay-1">
            Check out what I&apos;ve been building
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData &&
              projectData.map((project, index) => (
                <div
                  key={index}
                  className="animate-fade-in-stagger min-h-80"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
});

Project.displayName = "Project";

export default Project;
