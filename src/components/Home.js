import React from "react";
import useProgressiveImg from "../utils/progressiveImg";
import smallImage from "../2014-Bierstadt-Lake-small.jpeg";
import largeImage from "../2014-Bierstadt-Lake.jpg";

const BlurredUpImage = () => {
  const [src, { blur }] = useProgressiveImg(smallImage, largeImage);
  return (
    <img
      src={src}
      alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
      className={
        blur
          ? "blur-lg transition-none absolute object-cover w-full h-full"
          : "blur-none filter ease-out duration-[2000ms] absolute object-cover w-full h-full"
      }
    />
  );
};

export default function Home() {
  return (
    <main className="relative flex flex-col flex-grow">
      {/* Background Image */}
      <BlurredUpImage />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Centered Content */}
      <section className="relative flex flex-grow items-center justify-center px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white font-bold cursive leading-none lg:leading-snug home-name">
          Hey, I'm Nathan!
        </h1>
      </section>
    </main>
  );
}
