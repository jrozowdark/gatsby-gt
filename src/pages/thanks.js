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
      {/* <div class="img-bg-thanks">
      <StaticImage class="bg-thanks"
          src="../images/bg-tahnks.png"
          // width={300}
          // height={500}
          objectFit="cover"
          quality={99}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Logo gatorade"
        />
      </div> */}
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
    <div class="tanks-component-second">
    <div class="ultimate-component">
      <div class="text-buy">
        <h2 class="font-line-black">mis</h2>
        <h3>compra</h3>
      </div>
      <div class="container-ultimate">
        <div class="background-image-ultimate">
          <StaticImage class="image-bg-ultimate"
            src="../images/bg-ultimate-qr.png"
            // width={300}
            // height={500}
            objectFit="cover"
            quality={99}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Logo gatorade"
          />
        </div>
        <div class="image-ultimate">
          <StaticImage class="camisa-buy"
            src="../images/camisa-buy.png"
            // width={300}
            // height={500}
            objectFit="contain"
            quality={99}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Logo gatorade"
          />
        </div>
        <div class="description-ultimate">
          <div class="title">
            <h5 class="text-rotate">pack</h5>
            <h2 class="font-line-orange">camiseta</h2>
            <h2 class="third-text">pack</h2>
          </div>
          <div class="units">
            <div class="unit">
              <h2 class="taste">maracuya</h2>
              <h2 class="amount">20 unidades</h2>
            </div>
            <div class="unit">
              <h2 class="taste">mandarina</h2>
              <h2 class="amount">10 unidades</h2>
            </div>
            <div class="unit">
              <h2 class="taste">tropical</h2>
              <h2 class="amount">5 unidades</h2>
            </div>
          </div>
          <div class="button-second">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              Recargar
        </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  </Layout>
)

export default IndexPage