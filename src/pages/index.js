import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Index = ({
  location,
  data: {
    allMarkdownRemark: {
      edges: posts
    },
    site: {
      siteMetadata: {
        title: siteTitle
      }
    }
  }
}) => {
  return (
    <Layout {...{ location }}>
      <SEO title={siteTitle} />
      <section className='grid'>
      <ul>
      {posts.map(({
        node: {
          frontmatter: {
            title,
            size,
            thumb: {
              publicURL
            },
            slug
          }
        }
      }) => {

        return (
          <li
            key={slug}
            className={size}>
            <Link
              to={slug}
              state={{ modal: true }}>
              <img
                src={publicURL}
                alt={title}
                className='responsive-img' />
            </Link>
          </li>
        )
      })}
      </ul>
      </section>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___order], order: ASC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
      ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            thumb {
              publicURL
            }
            size
            title
            slug
          }
        }
      }
    }
  }
`
