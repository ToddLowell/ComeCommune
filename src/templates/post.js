import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout.js'
import { css } from '@emotion/react'
import { Disqus } from 'gatsby-plugin-disqus'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

export const pageQuery = graphql`
  query ArticlesBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulArticles(slug: { eq: $slug }) {
      slug
      title
      publishDate(formatString: "MMMM Do, YYYY")
      imageCredit
      image {
        title
        gatsbyImageData
        width
        height
        url
      }
      article {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            gatsbyImageData
          }
        }
      }
    }
    prevPost: contentfulArticles(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    nextPost: contentfulArticles(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`

const PostTemplate = ({ data: { contentfulArticles: { article, image, imageCredit, publishDate, slug, title }, nextPost, prevPost } }) => {
  const disqusConfig = {
    url: `https://comecommune.netlify.app/articles/${slug}`,
    identifier: slug,
    title
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { gatsbyImageData, title } = node.data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }

        return <GatsbyImage image={gatsbyImageData} alt={title} className="center-image" />
      }
    }
  }

  const excerpt = documentToPlainTextString(JSON.parse(article.raw)).slice(0, 250) + '...'

  return (
    <Layout>
      <Helmet>
        <title>{title} | ComeCommune</title>
        <meta name="description" content={excerpt} />

        {/* OpenGraph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:url" content={'https://comecommune.netlify.app/articles/' + slug + '/'} />
        {image && (<meta property="og:image" content={image.url} />)}
        {image && (<meta property="og:image:width" content={image.width} />)}
        {image && (<meta property="og:image:height" content={image.height} />)}
      </Helmet>
      <section className="article">
        <article className="container">
          <h1 className="heading__tertiary">{title}</h1>
          <p
            className="paragraph"
            css={css`
              margin-top: 0rem;
            `}
          >
            <i className="icofont-clock-time"></i>
            {publishDate}
          </p>
          {image && (<GatsbyImage image={image.gatsbyImageData} alt={image.title || ''} />)}
          {image && imageCredit && (
            <p
              className="paragraph"
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {imageCredit}
            </p>
          )}
          <div
            className="paragraph--article"
            css={css`
              blockquote {
                padding-left: 4rem;
              }

              table {
                border-collapse: collapse;
                display: flex;
                justify-content: center;
                margin: 2rem 0;

                & td, th {
                  border: 1px solid #ddd;
                  border-width: 1px 0 1px 0;
                  text-align: left;
                  padding: 8px;
                }

                & tr:nth-of-type(even) {
                  background-color: #f7f7f7;
                }
              }
            `}
          >
            {renderRichText(article, options)}
          </div>

          {/* Disqus */}
          <Disqus config={disqusConfig} />

          <div
            className="selector"
            css={css`
              * + * {
                margin-top: 0 !important;
              }
            `}
          >
            {prevPost && (
                  <div className="selector__prev">
                    <i className="icofont-rounded-left"></i>
                    <div>
                      <h4>Previous Article</h4>
                      <h3 className="heading__tertiary">{prevPost.title}</h3>
                      <Link to={`/articles/${prevPost.slug}`} className="selector__prev--btn">
                        Read More
                      </Link>
                    </div>
                  </div>
            )
            }
            {nextPost && (
                  <div className="selector__next">
                    <div>
                      <h4>Next Article</h4>
                      <h3 className="heading__tertiary">{nextPost.title}</h3>
                      <Link to={`/articles/${nextPost.slug}`} className="selector__next--btn">
                        Read More
                      </Link>
                    </div>
                    <i className="icofont-rounded-right"></i>
                  </div>
            )
              }
          </div>
        </article>
      </section>
    </Layout>
  )
}

export default PostTemplate
