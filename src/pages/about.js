import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/layout.js';

export default () => {
  const { image } = useStaticQuery(graphql`
    {
      image: file(relativePath: { eq: "profile_pic.jpg" }) {
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

  return (
    <Layout>
      <div className="container">
        <section className="about">
          <h2 className="heading__secondary color-primary">About Me</h2>
          <div className="about-me">
            <div className="about-me__text">
              <p className="about-me__paragraph">
                “Commune” is defined according to the Cambridge English Dictionary as “a group of people who live and
                work together and share responsibilities.” Though privacy and individualism seem to be more
                characteristic of society today, we necessarily and inevitably remain a commune in the rules, behaviours
                and customs we treat as a given. These ‘laws’ lie on a spectrum between two poles, undetectable without
                taking a step back in contemplation, or so obvious that people would not feel the need to articulate it.
                This blog aims to bring such paradigms to the front.
              </p>
              <p className="about-me__paragraph">
                I am a law student at the university of Cambridge and many of this articles will tend to take more of a
                legal edge. But the flexibility of a blog allows me to go beyond the assumptions of the subject. The
                simplest example, instead of saying that justice is a given, I may discuss why it is a given and
                consider alternatives where it is not. Not being restricted by the assumptions of law opens room for a
                more philosophical and creative take on the matter, with law playing a unique role of being somewhat an
                analogy.
              </p>
              <p className="about-me__paragraph">
                Another thing I may do is to use “law” in a different sense, rather than its ordinarily understood sense
                of rules created by a national legislature. I’m using it in the sense at which it refers to the
                unconscious paradigms we govern our own lives by, many of these paradigms either communally imposed or
                formed as a rebellion to such communal intervention. You will find me doing this often (as I did in the
                first paragraph) and I will indicate when I am doing so, though I think from context you would
                intuitively see how I’m using the original term beyond is ordinarily understood sense.
              </p>
              <p className="about-me__paragraph">
                I am also a Christian and interested with questions of the theological-philosophical sphere. And you
                might find this seeping in to some of my articles.
              </p>
              <p className="about-me__paragraph">
                Lastly, the word “commune” is pre-empted by the word “come”. It is an invitation for your response,
                comment and critique. My intention for this blog is to form a group of people who question the laws they
                live by, instead of blindly accepting them. Then proceed to scrap those which they deem unjustifiably
                inhibiting, while affirming the worthwhile with conviction.
              </p>
            </div>
            <div className="about-me__photo">
              <GatsbyImage image={image.sharp.gatsbyImageData} alt="Brendan Low" />
            </div>
          </div>
          <div className="contributions">
            <h2>I've also contributed to these other websites. Check them out!</h2>
            <ol className="gradient-list">
              <li>
                <a
                  className="contributions__link"
                  href="https://asasikini.wordpress.com/2020/05/07/crime-or-cakes-has-police-powers-taken-too-big-of-a-slice/"
                >
                  Crimes or Cakes? Has Police Powers Taken too Big of a Slice?
                </a>
              </li>
              <li>
                <a
                  className="contributions__link"
                  href="https://www.zeteomagazine.com/post/washington-the-vine-and-the-fig-tree-three-hopes-in-hamilton"
                >
                  Washington, the Vine and the Fig Tree: Three Hopes in Hamilton
                </a>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </Layout>
  );
};
