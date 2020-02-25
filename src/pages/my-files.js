import React from "react"
import { graphql } from "gatsby"


export default ({ data }) => {
    console.log(data)
    return (

        <div>Hello world</div>
    
    )
  }
  export const query = graphql`
  query{
    allFile {
      edges {
        node {
          relativePath
          extension
          relativeDirectory
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
  `

