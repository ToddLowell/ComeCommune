import React from 'react'
import Layout from '../components/layout.js'
import PostPreview from '../components/post-preview.js'
import usePosts from '../hooks/use-posts.js'

const Articles = () => {
  const posts = usePosts()

  return (
    <Layout>
      <section className="article--preview__container">
        <div className="container">
          <h1 className="heading__secondary color-primary">Latest Articles</h1>

          <div className="article__display">
            {posts
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                <PostPreview key={post.slug} post={post} />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Articles
