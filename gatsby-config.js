const path = require('path')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Come Commune! | ComeCommune',
    description:
      'Laws unspoken, unbroken and unknown. Come Commune is a blog by Brendan Low where he talks about his life and experience with the world.'
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'static')
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'comecommune'
      }
    }
  ]
}
