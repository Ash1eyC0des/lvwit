import React from 'react';
import { Link } from 'gatsby';

export default function Nav({ onMenuToggle = () => {} }) {
  return (
    <nav id="menu">
      <div className="inner">
        <h2>Menu</h2>
        <ul className="links">
          <li>
            <Link
              onClick={(e) => {
                onMenuToggle();
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => {
                onMenuToggle();
              }}
              to="/#one"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => {
                onMenuToggle();
              }}
              to="/events"
            >
              Upcoming Events
            </Link>
          </li>

          <li>
            <Link
              onClick={(e) => {
                onMenuToggle();
              }}
              to="/"
            >
              Resources (Coming Soon!)
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => {
                onMenuToggle();
              }}
              to="#footer"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <a
          className="close"
          onClick={(e) => {
            e.preventDefault();
            onMenuToggle();
          }}
          href="#menu"
        >
          {''}
        </a>
      </div>
    </nav>
  );
}
