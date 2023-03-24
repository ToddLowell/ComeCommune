import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout.js';
import { css } from '@emotion/react';
import { Disqus } from 'gatsby-plugin-disqus';

export const query = graphql`
  query($title: String!, $title_prev: String!, $title_next: String!) {
    mdx(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        path
        title
        date
        image {
          sharp: childImageSharp {
            fluid {
              src
              presentationWidth
              presentationHeight
            }
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
        image_alt
        image_credit
      }
      body
      excerpt(pruneLength: 260)
    }
    prev: mdx(frontmatter: { title: { eq: $title_prev } }) {
      frontmatter {
        path
        title
      }
    }
    next: mdx(frontmatter: { title: { eq: $title_next } }) {
      frontmatter {
        path
        title
      }
    }
  }
`;

const PostTemplate = ({ /*pageContext,*/ data: { mdx: post, prev: prev_post, next: next_post } }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateRaw = new Date(post.frontmatter.date);
  const date = `${months[dateRaw.getMonth()]} ${dateRaw.getDate()}, ${dateRaw.getFullYear()}`;

  const disqusConfig = {
    url: `https://comecommune.netlify.app/articles/${post.frontmatter.path}`,
    identifier: post.frontmatter.path,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title} | ComeCommune</title>

        {/* OpenGraph */}
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={'https://comecommune.netlify.app/articles/' + post.frontmatter.path + '/'} />
        {post.frontmatter.image && (
          <meta
            property="og:image"
            content={'https://comecommune.netlify.app' + post.frontmatter.image.sharp.fluid.src}
          />
        )}
        {post.frontmatter.image && (
          <meta property="og:image:width" content={post.frontmatter.image.sharp.fluid.presentationWidth} />
        )}
        {post.frontmatter.image && (
          <meta property="og:image:height" content={post.frontmatter.image.sharp.fluid.presentationHeight} />
        )}
      </Helmet>
      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
      <section className="article">
        <article className="container">
          <h1 className="heading__tertiary">{post.frontmatter.title}</h1>
          <p
            className="paragraph"
            css={css`
              margin-top: 0rem;
            `}
          >
            <i className="icofont-clock-time"></i>
            {date}
          </p>
          {(() => {
            if (post.frontmatter.image) {
              return <GatsbyImage image={post.frontmatter.image.sharp.gatsbyImageData} alt={post.frontmatter.image_alt || ''} />;
            }
          })()}
          {(() => {
            if (post.frontmatter.image_credit) {
              return (
                <p
                  className="paragraph"
                  css={css`
                    margin-top: 0.5rem;
                  `}
                >
                  (Photo Credit: {post.frontmatter.image_credit})
                </p>
              );
            }
          })()}
          <p
            className="paragraph--article"
            css={css`
              ///////////
              // table //
              ///////////

              blockquote {
                padding-left: 4rem;
              }

              table {
                border-collapse: collapse;
                display: flex;
                justify-content: center;
                margin: 2rem 0;

                & td,
                th {
                  border: 1px solid #ddd;
                  border-width: 1px 0 1px 0;
                  text-align: left;
                  padding: 8px;
                }

                & th {
                  border-top: none;
                }

                & tr:nth-of-type(even) {
                  background-color: #f7f7f7;
                }
              }
            `}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </p>

          {/* Disqus */}
          <Disqus config={disqusConfig} />

          <div
            className="selector"
            css={css`
              * + * {
                margin-top: 0;
              }
            `}
          >
            {(() => {
              if (prev_post) {
                return (
                  <div className="selector__prev">
                    <i className="icofont-rounded-left"></i>
                    <div>
                      <h4>Previous Article</h4>
                      <h3 className="heading__tertiary">{prev_post.frontmatter.title}</h3>
                      <Link to={`/articles/${prev_post.frontmatter.path}`} className="selector__prev--btn">
                        Read More
                      </Link>
                    </div>
                  </div>
                );
              }
            })()}
            {(() => {
              if (next_post) {
                return (
                  <div className="selector__next">
                    <div>
                      <h4>Next Article</h4>
                      <h3 className="heading__tertiary">{next_post.frontmatter.title}</h3>
                      <Link to={`/articles/${next_post.frontmatter.path}`} className="selector__next--btn">
                        Read More
                      </Link>
                    </div>
                    <i className="icofont-rounded-right"></i>
                  </div>
                );
              }
            })()}
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default PostTemplate;
