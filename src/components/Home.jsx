import React from "react";

export default function Home() {
  return (
    <main className="relative flex flex-col grow">
      {/* Centered Content - Background rendered by App (shared with About) */}
      <section className="relative flex grow items-center justify-center px-8 transform-gpu">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-indigo-50 font-bold cursive leading-none lg:leading-snug home-name transform-gpu animate-fade-in">
          Hey, I'm Nathan!
        </h1>
      </section>
    </main>
  );
}
