import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto flex justify-center">
        <div className="inline-flex py-3 px-3 my-6">
          <SocialIcon
            url="https://www.linkedin.com/in/nlewis84/"
            className="mr-4"
            target="_blank"
            bgColor="#374151"
            fgColor="#F59E0B"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://github.com/nlewis84"
            className="mr-4 hover:text-yellow-400"
            target="_blank"
            bgColor="#374151"
            fgColor="#F59E0B"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://twitter.com/nlewis84"
            className="mr-4 hover:text-yellow-400"
            target="_blank"
            bgColor="#374151"
            fgColor="#F59E0B"
            style={{ height: 35, width: 35 }}
          />
          <a target="_blank" rel="noreferrer" href="https://account.venmo.com/u/Nathan-Lewis-35">
            <div className="rounded-full h-9 w-9 flex items-center justify-center bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#F59E0B"
                viewBox="0 0 256 256"
              >
                <rect width="48" height="48" fill="none"></rect>
                <path
                  d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80Z"
                  opacity="0.2"
                ></path>
                <line
                  x1="88"
                  y1="24"
                  x2="88"
                  y2="56"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="120"
                  y1="24"
                  x2="120"
                  y2="56"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="152"
                  y1="24"
                  x2="152"
                  y2="56"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="32"
                  y1="216"
                  x2="208"
                  y2="216"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <path
                  d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
                <path
                  d="M208,88h0a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-3.4"
                  fill="none"
                  stroke="#F59E0B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
