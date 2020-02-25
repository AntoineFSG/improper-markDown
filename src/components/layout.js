/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Header from "./header"
import Footer from "./footer"
import layoutStyles from "../css/layout.module.scss"
import { useStaticQuery, graphql } from "gatsby"

const Layout = (props) => {
  const staticData = useStaticQuery(graphql`
  query SiteQuery {
      file(name: {eq: "logo"}) {
        name
        childImageSharp {
          fluid{
            ...GatsbyImageSharpFluid
          }
        }
      }
    site {
      siteMetadata {
        title
        author
      }
    }
  }
  `)
  return (
    <div className={layoutStyles.main}>
      <Header logo={staticData.file.childImageSharp.fluid} title={staticData.site.siteMetadata.title} />
      <content>{props.children}</content>
       <Footer/>
    </div>
  )
}

export default Layout
