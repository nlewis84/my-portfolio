import React from "react";
import image from "../2014-Bierstadt-Lake.jpg";

export default function Home() {
    return (
        <main className="relative">
            <img
                src={image}
                alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
                className="absolute object-cover w-full h-full"
            />
            <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
                <h1 className="text-6xl text-white font-bold cursive leading-none lg:leading-snug home-name">
                    Hey, I'm Nathan!
                </h1>
            </section>
        </main>
    );
}
