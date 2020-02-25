import React, {Component} from 'react'
import galleryStyles from '../css/gallery.module.scss'
import GalleryItem from "../components/galleryItem.js"


class Gallery extends Component {
    render() {
        let galleryImages= this.props.galleryImages
      return (
        <div className={galleryStyles.imagesContainer}>
        <h1 className={galleryStyles.galleryH1}>GALLERY</h1>
          {galleryImages.map((image) => (
              <div>
                {image &&<GalleryItem alt='gallery Image' key={image.id} fluid={image.childImageSharp.fluid}/>}
              </div>
          ))}
        </div>
      )
    }
  }
export default Gallery
