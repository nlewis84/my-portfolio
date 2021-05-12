import React from "react";
import { SocialIcon } from "react-social-icons";

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
                </div>
            </div>
        </footer>
    );
}
