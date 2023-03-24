import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout.js';
import PostPreview from '../components/post-preview-main-page.js';
import usePosts from '../hooks/use-posts.js';

export default () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "hero.jpg" }) {
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

  const posts = usePosts();
  const row1 = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  const row2 = posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(2, 4);

  return (
    <Layout>
        <div className="header">
        <GatsbyImage image={image.sharp.gatsbyImageData} className="header__image" alt={"testimage"}/>
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
              <PostPreview key={post.title} post={post} />
            ))}
          </div>

          <div className="article__list">
            {row2.map((post) => (
              <PostPreview key={post.title} post={post} />
            ))}
          </div>
          <Link to="/articles" className="btn">
            View All
          </Link>
        </div>
      </section>
    </Layout>
  );
};
