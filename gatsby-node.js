exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulArticles implements Node {
      contentful_id: String!
      title: String!
      slug: String!
      publishDate(
        formatString: String
      ): Date!
      image: ContentfulAsset
      imageCredit: String
      article: ContentfulArticlesArticle!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(
    `
      {
        allContentfulArticles {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      'There was an error loading your Contentful posts',
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulArticles.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      actions.createPage({
        path: `/articles/${post.slug}/`,
        component: require.resolve('./src/templates/post.js'),
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug
        }
      })
    })
  }
}

/**
 * Print all data types
 * https://www.gatsbyjs.com/docs/reference/config-files/actions/#printTypeDefinitions
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.printTypeDefinitions({ path: './typeDefs.txt' })
}
