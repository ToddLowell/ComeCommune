import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

class Footer extends Component {
  // When the user clicks on the button, scroll to the top of the document
  scrollToTop () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  render () {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__text">
            <button
              onClick={this.scrollToTop}
              css={css`
                border: none;
                background-color: transparent;
                font-size: inherit;
                color: inherit;
              `}
            >
              <p className="link">
                <i className="icofont-arrow-up"></i>
                <span className="footer__text--top">Back to the top</span>
              </p>
            </button>
            <p>|</p>
            <p>
              <Link to="/about" className="link">
                About
              </Link>
            </p>
            <p>
              <Link to="/contact" className="link">
                Contact
              </Link>
            </p>
          </div>
          <div className="copyright">
            <p className="copyright__text">
              Copyright &copy; 2020 Brendan Low. All rights reserved. <br className="copyright__text--break" />
              Designed by{' '}
              <a
                href="https://www.raaedkabir.com/"
                className="copyright__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Raaed Kabir
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
