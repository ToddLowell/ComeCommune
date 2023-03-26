import React from 'react'
import Navbar from './nav.js'
import Footer from './footer.js'
import Helmet from 'react-helmet'
import useSiteMetadata from '../hooks/use-site-metadata.js'

import '../scss/main.scss'
import '../icofont/icofont.css'

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet" />

        {/* OpenGraph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://comecommune.netlify.app/" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://comecommune.netlify.app/logo-black.png" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
      </Helmet>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
