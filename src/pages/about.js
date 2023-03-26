import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout.js'

const About = () => {
  const { allContentfulAboutPage } = useStaticQuery(graphql`
    {
      allContentfulAboutPage(
      filter: { contentful_id: { eq: "19UMwGJ4v0fTpI6PdT7Hfw" } }
    ) {
        nodes {
          pageHeading
          pageDescription {
            pageDescription
          }
          image {
            title
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
          otherContributions {
            title
            url
          }
        }
      }
    }
  `)

  const [about] = allContentfulAboutPage.nodes

  return (
    <Layout>
      <div className="container">
        <section className="about">
          <h2 className="heading__secondary color-primary">{about.pageHeading}</h2>
          <div className="about-me">
            <div className="about-me__text">
              {about.pageDescription.pageDescription.split('\n').map((paragraph, i) =>
                <p key={i} className="about-me__paragraph">
                {paragraph}
              </p>
              )
              }
            </div>
            <div className="about-me__photo">
              <GatsbyImage image={about.image.gatsbyImageData} alt={about.image.title} />
            </div>
          </div>
          {about.otherContributions && about.otherContributions.length && (
            <div className="contributions">
              <h2>I&apos;ve also contributed to these other websites. Check them out!</h2>
              <ol className="gradient-list">
                {about.otherContributions.map((contribution, i) => {
                  return (<li key={i}>
                    <a
                      className="contributions__link"
                      href={contribution.url}
                    >
                      {contribution.title}
                    </a>
                  </li>)
                })
                }
              </ol>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export default About
