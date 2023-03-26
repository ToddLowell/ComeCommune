import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout.js'
import PostPreview from '../components/post-preview-main-page.js'
import usePosts from '../hooks/use-posts.js'

const Home = () => {
  const { allContentfulHomePage } = useStaticQuery(graphql`
    {
      allContentfulHomePage(filter: {contentful_id: {eq: "3PJfjU811TXUXqRSGl814f"}}) {
        nodes {
          image {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 100
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `)

  const posts = usePosts()
  const row1 = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2)
  const row2 = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(2, 4)

  return (
    <Layout>
        <div className="header">
        <GatsbyImage image={allContentfulHomePage.nodes[0].image.gatsbyImageData} className="header__image" alt={'testimage'}/>
        <div className="header__text-box">
          <h1 className="heading__primary">
            <span className="heading__primary--main">Come</span>
            <br />
            <span className="heading__primary--sub">Commune</span>
            <br />
            <span className="heading__primary--subtext">by Brendan Low</span>
          </h1>
        </div>
        </div>

      <section className="article--preview__container">
        <div className="container">
          <h2 className="heading__secondary">Latest Articles</h2>

          <div className="article__list pd-bt-sm">
            {row1.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>

          <div className="article__list">
            {row2.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>
          <Link to="/articles" className="btn">
            View All
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Home
