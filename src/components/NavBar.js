import React from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

export default function Navbar() {
    return (
        <header className="bg-gray-900">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink
                        to="/"
                        exact
                        activeClassName="text-yellow-400"
                        className="inline-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-yellow-400 text-4xl font-bold cursive tracking-widest"
                    >
                        Nathan
                    </NavLink>
                    <NavLink
                        to="/post"
                        activeClassName="text-yellow-400 bg-gray-700"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-white hover:text-yellow-400"
                    >
                        Blog Posts
                    </NavLink>
                    <NavLink
                        to="/project"
                        activeClassName="text-yellow-400 bg-gray-700"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-white hover:text-yellow-400"
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to="/about"
                        activeClassName="text-yellow-400 bg-gray-700"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-white hover:text-yellow-400"
                    >
                        About
                    </NavLink>
                </nav>
                <div className="inline-flex py-3 px-3 my-6">
                    <SocialIcon
                        url="https://www.linkedin.com/in/nlewis84/"
                        className="mr-4"
                        target="_blank"
                        bgColor="#374151"
                        fgColor="#FFF"
                        style={{ height: 35, width: 35 }}
                    />
                    <SocialIcon
                        url="https://github.com/nlewis84"
                        className="mr-4"
                        target="_blank"
                        bgColor="#374151"
                        fgColor="#FFF"
                        style={{ height: 35, width: 35 }}
                    />
                    <SocialIcon
                        url="https://twitter.com/nlewis84"
                        className="mr-4"
                        target="_blank"
                        bgColor="#374151"
                        fgColor="#FFF"
                        style={{ height: 35, width: 35 }}
                    />
                </div>
            </div>
        </header>
    );
}
