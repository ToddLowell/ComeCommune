import React, { useEffect, useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { css } from '@emotion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "logo-white.png" }) {
        sharp: childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `);

  useEffect(() => {
    // hardcode different style for index page
    const nav = document.querySelector('.navbar');

    if (window.location.pathname === '/') {
      nav.style.backgroundColor = 'transparent';
      nav.style.position = 'absolute';
    }
  });

  return (
    <div className={isOpen ? 'navbar opened' : 'navbar'}>
      <nav className="nav-container container">
        <Link to="/" className="logo navbar__home">
          <GatsbyImage image={image.sharp.gatsbyImageData} alt="logo" className="navbar__home--icon" />
          <span className="navbar__home--text">
            <span className="color-grey">Come</span>Commune
          </span>
        </Link>
        {/* only show hamburger menu on mobile */}
        <button
          className="menu-toggle"
          onClick={toggle}
          css={css`
            cursor: pointer;
            border: none;
            background-color: transparent;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            &:focus {
              outline: none;
            }

            .bar {
              display: block;
              width: 30px;
              height: 4px;
              margin: 2px;
              transition: all 0.2s ease;
              background-color: var(--color-grey);
            }
          `}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className="nav-menu">
          <ul className="nav-links">
            <li className="navbar__item">
              <Link to="/" activeClassName="navbar__link--active" className="navbar__link">
                Home
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/about" activeClassName="navbar__link--active" className="navbar__link">
                About
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/articles" activeClassName="navbar__link--active" className="navbar__link">
                Articles
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/contact" activeClassName="navbar__link--active" className="navbar__link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
