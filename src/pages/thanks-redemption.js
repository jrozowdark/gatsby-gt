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
          <h2>¡Es hora de hidratarte con la bebida Nº 1 de deportistas!</h2>
        </div>
        <div class="text-two">
          <h2>resumen de la redención</h2>
        </div>
        <div class="text-three">
          <h2 class="text-number">01</h2>
        </div>
        <div class="text-four">
          <div class="unit">
            <h2 class="number-units">Sabor:</h2>
            <h2 class="fruit">mandarina</h2>
          </div>
        </div>
        <div class="button-second">
           <Link to="/user/zone">Finalizar</Link>
          </div>
      </div>
    </div>
    </main>
  </Layout>
)

export default IndexPage
