import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Form, Button} from "react-bootstrap"
import "../sass/base/_fonts.scss"

const IndexPage = () => (
  <Layout>
  <SEO title="tnaks" />
  <main class="thanks">
    <div class="tanks-component-fisrt">
      <div class="text-tanks">
        <div class="text-one">
          <h2>gracias por tu compra</h2>
        </div>
        <div class="text-two">
          <h2>resumen de la compra</h2>
        </div>
        <div class="text-three">
          <h2 class="text-rotate">pack</h2>
          <h2 class="text-number">01</h2>
          <h2 class="text-ultimate">pack</h2>
        </div>
        <div class="text-four">
          <div class="unit">
            <h2 class="fruit">mandarina</h2>
            <h2 class="number-units">10 unidades</h2>
          </div>
          <div class="unit">
            <h2 class="fruit">maracuya</h2>
            <h2 class="number-units">10 unidades</h2>
          </div>
        </div>
        <div class="button-second">
           <Link to="/">ingresa</Link>
          </div>
      </div>
    </div>
  </main>
  </Layout>
)

export default IndexPage
