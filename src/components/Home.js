import React from 'react';
import useProgressiveImg from '../utils/progressiveImg';
import smallImage from '../2014-Bierstadt-Lake-small.jpeg';
import largeImage from '../2014-Bierstadt-Lake.jpg';

const BlurredUpImage = () => {
  const [src, { blur }] = useProgressiveImg(smallImage, largeImage);
  console.log(src, blur);
  return (
    <img
      src={src}
      alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
      className={
        blur
          ? 'blur-lg transition-none absolute object-cover w-full h-full'
          : 'blur-none filter ease-out duration-[2000ms] absolute object-cover w-full h-full'
      }
    />
  );
};

export default function Home() {
  return (
    <main className="relative flex-grow">
      <BlurredUpImage />
      <section className="relative flex justify-center pt-12 lg:pt-64 px-8">
        <h1 className="text-6xl text-white font-bold cursive leading-none lg:leading-snug home-name">
          Hey, I'm Nathan!
        </h1>
      </section>
    </main>
  );
}
