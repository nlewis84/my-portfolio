import React, { useEffect, useState } from "react";
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
        <main className="bg-indigo-100 min-h-screen p-2 pt-12 md:p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center cursive">
                    My Projects
                </h1>
                <h2 className="text-lg text-gray-700 flex justify-center mb-12">
                    Check out what I've been building
                </h2>
                <section className="grid md:grid-cols-2 gap-8">
                    {projectData &&
                        projectData.map((project, index) => (
                            <article className="relative rounded-lg shadow-xl bg-white px-4 lg:px-16 p-4 lg:py-16">
                                <h3 className="text-gray-900 text-3xl font-bold mb-2 hover:text-yellow-500">
                                    <a
                                        href={project.link}
                                        alt={project.title}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.title}
                                    </a>
                                </h3>
                                <div className="text-gray-500 text-xs md:space-x-4">
                                    <span className="inline-block px-1 md:px-0">
                                        <strong className="font-bold">
                                            Finished on
                                        </strong>
                                        :{" "}
                                        {new Date(
                                            project.date
                                        ).toLocaleDateString()}
                                    </span>
                                    <span className="inline-block px-1 md:px-0">
                                        <strong className="font-bold">
                                            Organization
                                        </strong>
                                        : {project.place}
                                    </span>
                                    <span className="inline-block px-1 md:px-0">
                                        <strong className="font-bold">
                                            Type
                                        </strong>
                                        : {project.projectType}
                                    </span>
                                    <p className="my-6 text-lg text-gray-900 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="text-yellow-600 font-bold hover:underline hover:text-yellow-800 text-xl"
                                    >
                                        View The Project{" "}
                                        <span
                                            role="img"
                                            aria-label="right pointer"
                                        >
                                            👉
                                        </span>
                                    </a>
                                </div>
                            </article>
                        ))}
                </section>
            </section>
        </main>
    );
}
