/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import drupalOauth from '../components/drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../components/drupal-oauth/withDrupalOauthProvider';
import "bootstrap/dist/css/bootstrap.min.css"


const drupalOauthClient = new drupalOauth({
  drupal_root: process.env.GATSBY_DRUPAL_ROOT,
  client_id: '772f9013-6c08-4602-b71f-04fe8298dbd1',
  client_secret: '123',
  scope: 'cliente',
});

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
        <Footer siteTitle={data.site.siteMetadata?.title || `Title`} />

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withDrupalOauthProvider(drupalOauthClient, Layout);

