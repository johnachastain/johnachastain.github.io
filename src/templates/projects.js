import React, { useCallback, useState, useEffect } from 'react'
import findIndex from 'lodash/findIndex';
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

const  Template = ({ data }) => {
    const {
      markdownRemark: {
        frontmatter: {
          description,
          title,
          full: { publicURL }
        },
        id,
        excerpt
      },
      allMarkdownRemark: {
        edges: posts
      },
      location
    } = data;

    const [initialized, setInitialized] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPost = posts[currentIndex];

    useEffect(
      () => {
          if (!initialized) {
            const currentIndex = findIndex(posts, ({node}) => node.id === id);
            setCurrentIndex(currentIndex);
            setInitialized(true);
          }
      },
      [
        setCurrentIndex,
        initialized,
        setInitialized,
        id,
        posts,
        findIndex
      ]
    );

    const onNext = useCallback(
      () => {
        if (currentIndex < posts.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      },
      [ currentIndex, setCurrentIndex, posts ]
    );

    const onPrev = useCallback(
      () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      },
      [ currentIndex, setCurrentIndex ]
    );

    return (
      <ModalRoutingContext>
        {({ modal, closeTo }) => (
          <div>
          {modal ?
            <div>
              <Link
                to={closeTo}
                className='react-modal-close-btn' />

                <div className='react-modal-content-inner'>
                  <Link
                    className='modal-img-link'
                    to={closeTo}>
                    <picture>
                      <img
                        src={publicURL}
                        alt={title}
                        className='modal-responsive-img' />
                    </picture>
                  </Link>
                </div>

            </div> :
            <Layout {...{ location }}>
              <SEO
                title={title}
                description={description || excerpt}
              />
              <img
                src={publicURL}
                alt={title}
                className='responsive-img project-page-img' />
            </Layout>
          }
          </div>
        )}
      </ModalRoutingContext>
    )
}

export default Template

export const pageQuery = graphql`
  query ProjectsBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        full {
          publicURL
        }
        slug
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___order], order: ASC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
      ) {
      edges {
        node {
          id
          fields {
            order
          }
          frontmatter {
            title
            full {
              publicURL
            }
            slug
          }
        }
      }
    }
  }
`
