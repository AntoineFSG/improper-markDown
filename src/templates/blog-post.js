import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SlideShow from "../components/slideShow"
import postStyles from "../css/post.module.scss"
import Parser from "../components/parser"
import Gallery from "../components/gallery"


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const {sliderImages} = pageContext
  const {galleryImages} = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
        <div className={postStyles.post}>
          <h1>{post.frontmatter.title}</h1>
          {sliderImages[0]!==undefined&&<div className={postStyles.sliderContainer}>
            <SlideShow slides={sliderImages}/></div>}
          <div className={postStyles.content}>
            <div className={postStyles.imageContainer}>
              {post.frontmatter.featuredImage.childImageSharp.fluid && <Img alt={post.frontmatter.title} fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}
            </div>
            <div className={postStyles.article}>
            <Parser data={post.html}/>
          </div>
          {galleryImages[0]!==undefined&&<div className={postStyles.galleryContainer}><Gallery galleryImages={galleryImages}/></div>}
        </div>
      </div>
      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allFile {
      edges {
        node {
          relativePath
          extension
          relativeDirectory
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields{
        slug
      }
      frontmatter {
        title
        featuredImage{
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                }
        }
      }
    }
  }
`
