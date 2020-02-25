const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allFile(filter: {childImageSharp: {fluid: {src: {ne: null}}}}) {
          edges {
            node {
              relativePath
              id
              childImageSharp {
                fluid {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }

        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const postFiles =[];
    result.data.allFile.edges.forEach(
      edge=> { if(edge.node.relativePath.slice(0,post.node.fields.slug.length-1) == post.node.fields.slug.substring(1)){
        postFiles.push(edge.node)
      };
      }
      )
    const sliderImages=postFiles.filter(obj=>obj.relativePath.includes('/slider/'))
    const galleryImages=postFiles.filter(obj=>obj.relativePath.includes('/gallery/'))
    console.log(galleryImages)
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
        galleryImages,
        sliderImages,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
