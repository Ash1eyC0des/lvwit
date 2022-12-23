import React, { useState } from 'react';
import Nav from './Nav';
import { Link } from 'gatsby';
export default function SideBar({ fullMenu, scroll }) {
  const [headerOpen, toggleHeader] = useState(false);
  return (
    <>
      <header id="header" className={`${fullMenu || scroll ? '' : 'alt'}`}>
        <h1>
          <Link to="/">Lehigh Valley Women in Tech</Link>
        </h1>

        <nav>
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              toggleHeader(!headerOpen);
            }}
            className="menuToggle"
          >
            <span>Menu</span>
          </a>
        </nav>
      </header>
      <div className={`${headerOpen ? 'is-menu-visible' : ' '}`}>
        <Nav onMenuToggle={() => toggleHeader(!headerOpen)} />
      </div>
    </>
  );
}
