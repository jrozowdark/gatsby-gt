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
    <main className="thanks">
      <div className="tanks-component-fisrt">
        <div className="box-thanks">
          <h2>gracias por tu compra</h2>
          <h4>resumen de la compra</h4>
          <div className="text-three">
            <small className="text-rotate">pack</small>
            <h2 className="text-number">01<span>pack</span></h2>
          </div>
          <div className="text-four">
            <div className="unit">
              <h3 className="fruit">mandarina</h3>
              <h4 className="number-units">10 unidades</h4>
            </div>
            <div className="unit">
              <h3 className="fruit">maracuya</h3>
              <h4 className="number-units">10 unidades</h4>
            </div>
          </div>
          <div className="button-first">
             <Link to="/">ingresa</Link>
          </div>
        </div>
      </div>
      <div className="tanks-component-second">
      <div className="ultimate-component">
        <div className="text-buy">
          <h2 className="font-line-black">mis</h2>
          <h3>compra</h3>
        </div>
        <div className="container-ultimate">
          <div className="background-image-ultimate">
            <StaticImage className="image-bg-ultimate"
              src="../images/bg-ultimate-qr.png"
              // width={300}
              // height={500}
              objectFit="cover"
              quality={99}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Logo gatorade"
            />
          </div>
          <div className="image-ultimate">
            <StaticImage className="camisa-buy"
              src="../images/camisa-buy.png"
              // width={300}
              // height={500}
              objectFit="contain"
              quality={99}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Logo gatorade"
            />
          </div>
          <div className="description-ultimate">
            <div className="title">
              <h5 className="text-rotate">pack</h5>
              <h2 className="font-line-orange">camiseta</h2>
              <h2 className="third-text">pack</h2>
            </div>
            <div className="units">
              <div className="unit">
                <h2 className="taste">maracuya</h2>
                <h2 className="amount">20 unidades</h2>
              </div>
              <div className="unit">
                <h2 className="taste">mandarina</h2>
                <h2 className="amount">10 unidades</h2>
              </div>
              <div className="unit">
                <h2 className="taste">tropical</h2>
                <h2 className="amount">5 unidades</h2>
              </div>
            </div>
            <div className="button-first">
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