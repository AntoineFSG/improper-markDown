import { Link} from "gatsby"
import Parser from "../components/parser"
import Img from "gatsby-image"
import React, { Component } from "react"
import postListStyles from "../css/postList.module.scss"

class PostList extends Component {
  render() {
    const data = this.props.data
    console.log(data)
    return (
      <>
        <div className={postListStyles.mainPostContainer}>
        {data.map( node => (
          <div className={postListStyles.postContainer}key={node.frontmatter.slug}>
          {node.frontmatter.featuredImage && <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid}/>}
            <Link className={postListStyles.overLay} to={node.fields.slug}>
              <h2 className={postListStyles.title}><Parser data={node.frontmatter.title}/></h2>
              <h2 style={{
                color:"white",
                textAlign:"center",
                margin:"1rem 1rem"
                }}>{node.frontmatter.categories.split(',').splice(1).join(' - ')}</h2>
            </Link>
          </div>
        ))}
        </div>
      </>
    )
  }
}

export default PostList


