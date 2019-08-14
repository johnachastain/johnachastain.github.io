const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const projectsPost = path.resolve(`./src/templates/projects.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                order
                sourceInstanceName
              }
              frontmatter {
                title
                description
                date
                thumb {
                  publicURL
                }
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      if (node.fields.sourceInstanceName === 'projects') {
        createPage({
          path: node.frontmatter.slug,
          component: projectsPost,
          context: {
              slug: node.frontmatter.slug,
          },
        })
      }
    })

  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    const fileNode = getNode(node.parent)

    createNodeField({
      name: `order`,
      node,
      value,
    })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: fileNode.sourceInstanceName
    })
  }
}
