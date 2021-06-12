import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../sass/base/_fonts.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="register" />
    <main className="regist-full container-fluid">
    <div className="row">
      <div className="box-register col-12 col-sm-6">
        <h2>registro exitoso</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className="button-first">
          <Link to="/user/profile"> ir a mi cuenta </Link>
        </div>
      </div>
    </div>
    </main>
  </Layout>
)

export default IndexPage
