import React, { memo } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavLinkItem = memo(({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center py-3 px-3 my-6 rounded hover:text-yellow-400 transition-colors duration-200 ${
          isActive ? "text-yellow-400 bg-gray-700" : ""
        }`
      }
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </NavLink>
  );
});

NavLinkItem.displayName = 'NavLinkItem';

const Navbar = memo(() => {
  return (
    <header 
      className="bg-gray-900 fixed top-0 w-full z-10 shadow-md"
      role="banner"
    >
      <div className="container pl-4 flex justify-between">
        <nav 
          className="inline-flex text-left text-indigo-50"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `inline-flex items-center py-6 px-3 mr-4 hover:text-yellow-400 text-4xl font-bold cursive tracking-widest transition-colors duration-200 ${
                isActive ? "text-yellow-400" : ""
              }`
            }
            aria-label="Home"
          >
            Nathan
          </NavLink>

          <NavLinkItem to="/post">Blog</NavLinkItem>
          <NavLinkItem to="/project">Projects</NavLinkItem>
          <NavLinkItem to="/about">About</NavLinkItem>
        </nav>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
