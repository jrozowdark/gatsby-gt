import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RegisterForm from "../components/drupal-oauth/RegisterForm";

const IndexPage = () => (
  <Layout>
    <SEO title="regist" />
    <div class="single-component">
      <div class="register">
        <div class="title-register">
          <h2>registro</h2>
        </div>
        <div class="form-register">
          <RegisterForm/>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
