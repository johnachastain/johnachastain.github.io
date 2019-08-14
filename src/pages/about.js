import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

const About = ({ data }) => {
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
            <div className='react-modal-content-inner about-modal-inner'>
              <div
                className='about-content'
                dangerouslySetInnerHTML={{ __html: html }} />
            </div>

          </div> :
          <Layout {...{ location }}>
            <SEO
              title={title}
              description={description || excerpt}
            />
            <div
              className='about-content about-content-page'
              dangerouslySetInnerHTML={{ __html: html }} />
          </Layout>
        }
        </div>
      )}
    </ModalRoutingContext>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: {slug: {eq: "/about/"}}) {
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
