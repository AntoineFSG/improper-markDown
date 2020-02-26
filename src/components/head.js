import React from 'react'
import { Helmet } from "react-helmet"
import {graphql, useStaticQuery} from "gatsby"
const Head = (props)=>{
    const headData = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
    return(
        <Helmet title={props.pageTitle+ "-" + headData.site.siteMetadata.title }/>
    )
}
export default Head