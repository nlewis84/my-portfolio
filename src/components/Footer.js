import React, { memo } from "react";
import { SocialIcon } from "react-social-icons";

const SocialLink = memo(({ url, className, label }) => (
  <SocialIcon
    url={url}
    className={`mr-4 transition-transform duration-200 hover:scale-110 ${className}`}
    target="_blank"
    rel="noopener noreferrer"
    bgColor="#374151"
    fgColor="#F59E0B"
    style={{ height: 35, width: 35 }}
    aria-label={label}
  />
));

SocialLink.displayName = 'SocialLink';

const VenmoLink = memo(() => (
  <a
    target="_blank"
    rel="noreferrer"
    href="https://account.venmo.com/u/Nathan-Lewis-35"
    className="transition-transform duration-200 hover:scale-110"
    aria-label="Venmo"
  >
    <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#F59E0B"
        viewBox="0 0 256 256"
        aria-hidden="true"
      >
        <rect width="48" height="48" fill="none" />
        <path
          d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80Z"
          opacity="0.2"
        />
        <line
          x1="88"
          y1="24"
          x2="88"
          y2="56"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="120"
          y1="24"
          x2="120"
          y2="56"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="152"
          y1="24"
          x2="152"
          y2="56"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <line
          x1="32"
          y1="216"
          x2="208"
          y2="216"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <path
          d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <path
          d="M208,88h0a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-3.4"
          fill="none"
          stroke="#F59E0B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
      </svg>
    </div>
  </a>
));

VenmoLink.displayName = 'VenmoLink';

const Footer = memo(() => {
  return (
    <footer 
      className="bg-gray-900 fixed bottom-0 w-full z-10 shadow-md"
      role="contentinfo"
    >
      <div className="container mx-auto flex justify-center">
        <div 
          className="inline-flex py-3 px-3 my-6"
          role="navigation"
          aria-label="Social media links"
        >
          <SocialLink 
            url="https://www.linkedin.com/in/nathanlewis-dev/"
            label="LinkedIn Profile"
          />
          <SocialLink 
            url="https://github.com/nlewis84"
            label="GitHub Profile"
          />
          <SocialLink 
            url="https://twitter.com/nlewis84"
            label="Twitter Profile"
          />
          <VenmoLink />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
