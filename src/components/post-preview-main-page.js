import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const PostPreview = ({ post }) => {
  const [month, day] = post.date.replace(',', '').split(' ');

  const ArticleLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;

  return (
    <article className="article__preview">
      <div className="article__preview--date">
        <div className="article__preview--day">{day}</div>
        <div className="article__preview--month">{month.substr(0, 3)}</div>
      </div>
      <ArticleLink to={`/articles/${post.slug}`}>
        <div className="article__preview--name">
          <h2 className="heading__tertiary">{post.title}</h2>
          <p className="paragraph">{post.excerpt}</p>
        </div>
      </ArticleLink>
    </article>
  );
};

export default PostPreview;
