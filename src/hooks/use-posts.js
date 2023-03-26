import { graphql, useStaticQuery } from 'gatsby'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

const usePosts = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulArticles {
        nodes {
          title
          slug
          publishDate
          article {
            raw
          }
        }
      }
    }
  `)

  return data.allContentfulArticles.nodes.map((article) => {
    const excerpt = documentToPlainTextString(JSON.parse(article.article.raw)).slice(0, 250) + '...'

    return {
      title: article.title,
      slug: article.slug,
      date: article.publishDate,
      excerpt
    }
  })
}

export default usePosts
