import { Link } from "gatsby"
import React from "react"
import headerStyles from "../css/header.module.scss"
import Img from "gatsby-image"


const Header = (props) => {

  const title= props.title
  const logo = props.logo
  return (
      <div className={headerStyles.header}>
        <div className={headerStyles.homecontainer}><Link to="/" style={{textDecoration:"none"}}className={headerStyles.logoLink}>
          <Img className={headerStyles.logo} alt={title} fluid={logo}/></Link>
        </div>
        <div className={headerStyles.navbarcontainer}>
        <div key="contact-form-improper">
          <Link to="/contactMe">Contact</Link>
        </div> 
        </div>
      </div>
    )
}

export default Header

