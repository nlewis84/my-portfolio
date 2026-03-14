import { memo, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavLinkItem = memo(({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      onClick={onClick}
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

NavLinkItem.displayName = "NavLinkItem";

const MobileNavLink = memo(({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block py-3 px-4 rounded hover:text-yellow-400 transition-colors duration-200 ${
          isActive ? "text-yellow-400 bg-gray-700" : ""
        }`
      }
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </NavLink>
  );
});

MobileNavLink.displayName = "MobileNavLink";

const Navbar = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setMenuOpen(false);
  }

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <header
      className="bg-gray-900 fixed top-0 w-full z-10 shadow-md"
      role="banner"
    >
      <div className="container pl-4 pr-4 flex justify-between items-center">
        <nav
          className="hidden sm:inline-flex text-left text-indigo-50"
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

        <NavLink
          to="/"
          className={({ isActive }) =>
            `sm:hidden inline-flex items-center py-4 hover:text-yellow-400 text-4xl font-bold cursive tracking-widest transition-colors duration-200 text-indigo-50 ${
              isActive ? "text-yellow-400" : ""
            }`
          }
          aria-label="Home"
        >
          Nathan
        </NavLink>

        <button
          className="sm:hidden text-indigo-50 p-2 rounded-sm hover:text-yellow-400 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          className="sm:hidden bg-gray-900 shadow-md text-indigo-50 px-4 pb-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <MobileNavLink to="/post" onClick={closeMenu}>
            Blog
          </MobileNavLink>
          <MobileNavLink to="/project" onClick={closeMenu}>
            Projects
          </MobileNavLink>
          <MobileNavLink to="/about" onClick={closeMenu}>
            About
          </MobileNavLink>
        </nav>
      )}
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
