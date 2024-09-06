import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gray-900 fixed top-0 w-full z-10">
      <div className="container pl-4 flex justify-between">
        <nav className="inline-flex text-left text-indigo-50">
          <NavLink
            exact
            to="/"
            activeClassName="text-yellow-400"
            className="inline-flex items-center py-6 px-3 mr-4 hover:text-yellow-400 text-4xl font-bold cursive tracking-widest"
          >
            Nathan
          </NavLink>

          <NavLink
            to="/post"
            activeClassName="text-yellow-400 bg-gray-700"
            className="inline-flex items-center py-3 px-3 my-6 rounded hover:text-yellow-400"
          >
            Blog
          </NavLink>

          <NavLink
            to="/project"
            activeClassName="text-yellow-400 bg-gray-700"
            className="inline-flex items-center py-3 px-3 my-6 rounded hover:text-yellow-400"
          >
            Projects
          </NavLink>

          <NavLink
            to="/about"
            activeClassName="text-yellow-400 bg-gray-700"
            className="inline-flex items-center py-3 px-3 my-6 rounded hover:text-yellow-400"
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
