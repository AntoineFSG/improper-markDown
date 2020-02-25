import React, {useState} from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
//import Head from "../components/head"
import PostList from "../components/postList"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const allCategories = [];
  console.log(posts)
  posts.forEach(({node})=>{
    let cat = node.frontmatter.categories;
    if(cat!==null){
      let cat = node.frontmatter.categories.split(',');
    cat.forEach(item=>{
    if(!allCategories.includes(item)){
        allCategories.push(item)
       }
     })}
  })
  console.log(allCategories)
  const [active,setActive]=useState("all");
  const filteredPosts=[];
  const getFilteredPosts=(posts,active)=>{
      posts.forEach(post=>{ 
        if(post.node.frontmatter.categories!==null){
          let postCategories=post.node.frontmatter.categories.split(',');
          console.log(postCategories)
          if(postCategories.includes(active)){
            filteredPosts.push(post.node);
            console.log(post.node)
          }
        }
        //let postCategories=post.node.frontmatter.categories.split(',');
      });
      return filteredPosts
    }
  return (
    <Layout data={data}>
    <SEO title="Home of Improper design" />
    <h1 className="introH1">The <span>Design Work</span> of  Ian McGillivray</h1>
    <div className="catContainer">
    {allCategories.map(node => (
      <button id={node+'-button'} onClick={()=>{setActive(node);}}>
        {node.toUpperCase()}
      </button>
    ))}
    </div>
    <PostList data={getFilteredPosts(posts,active)} activeCat={active}/>
  </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    file(name: {eq: "logo"}) {
      childImageSharp {
        fluid {
          aspectRatio
          base64
          src
          srcSet
          tracedSVG
          srcWebp
          srcSetWebp
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            categories
            featuredImage{
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid_withWebp
                        }
                    }
            }
          }
        }
      }
    }
  }
`
