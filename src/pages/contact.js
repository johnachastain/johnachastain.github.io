import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

const Contact = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: {
        description,
        title
      },
      html,
      excerpt
    },
    location
  } = data;


  return (
    <ModalRoutingContext>
      {({ modal, closeTo }) => (
        <div>
        {modal ?
          <div>
            <Link
                to={closeTo}
                className='react-modal-close-btn' />
            <div className='react-modal-content-inner contact-modal-inner'>
              <div
                className='contact-content'
                dangerouslySetInnerHTML={{ __html: html }} />
               <ul className='social'>
                <li>
                    <a href='https://www.artstation.com/johnachastain'>
                        <img src='/svg/artstation.svg' alt='artstation' />
                    </a>
                </li>
                <li>
                    <a href='https://www.behance.net/picastudio'>
                        <img src='/svg/behance.svg' alt='behance' />
                    </a>
                </li>
                <li>
                    <a href='https://dribbble.com/picastudio'>
                        <img src='/svg/dribbble.svg' alt='dribbble' />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/johnachastain/'>
                        <img src='/svg/instagram.svg' alt='instagram' />
                    </a>
                </li>
            </ul>
            </div>

          </div> :
          <Layout {...{ location }}>
            <SEO
              title={title}
              description={description || excerpt}
            />
            <div
              className='contact-content contact-content-page'
              dangerouslySetInnerHTML={{ __html: html }} />
             <ul className='contact-content-social social'>
                <li>
                    <a href='https://www.artstation.com/johnachastain'>
                        <img src='/svg/artstation.svg' alt='artstation' />
                    </a>
                </li>
                <li>
                    <a href='https://www.behance.net/picastudio'>
                        <img src='/svg/behance.svg' alt='behance' />
                    </a>
                </li>
                <li>
                    <a href='https://dribbble.com/picastudio'>
                        <img src='/svg/dribbble.svg' alt='dribbble' />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/johnachastain/'>
                        <img src='/svg/instagram.svg' alt='instagram' />
                    </a>
                </li>
            </ul>
          </Layout>
        }
        </div>
      )}
    </ModalRoutingContext>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: {slug: {eq: "/contact/"}}) {
      html
      excerpt
      frontmatter {
        title
        description,
        slug
      }
    }
  }
`
