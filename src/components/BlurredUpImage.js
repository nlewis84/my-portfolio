import React, { memo, useState } from "react";
import useProgressiveImg from "../utils/progressiveImg";
import smallImage from "../2014-Bierstadt-Lake-small.jpeg";
import largeImage from "../2014-Bierstadt-Lake.jpg";

const BlurredUpImage = memo(() => {
  const [src, { blur }] = useProgressiveImg(smallImage, largeImage);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-indigo-700">
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Bierstadt Lake in Estes Park, Colorado with Rocky Mountains in the background"
      loading="eager"
      fetchpriority="high"
      onError={() => setError(true)}
      className={
        blur
          ? "blur-lg transition-none absolute object-cover w-full h-full"
          : "blur-none filter ease-out duration-1000 absolute object-cover w-full h-full"
      }
      width="1920"
      height="1080"
    />
  );
});

BlurredUpImage.displayName = "BlurredUpImage";

export default BlurredUpImage;
