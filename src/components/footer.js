import React from "react"
import footerStyles from "../css/footer.module.scss"

 const Footer = (props) =>{ 
    return (
  <footer className={footerStyles.footer}>
    <div>
  
      © {new Date().getFullYear()} Ian McGillivray
    </div>
  </footer>
)}
export default Footer
