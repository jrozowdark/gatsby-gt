import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GatoradeOne from "../images/image-header-mail.png";
import imageFooter from "../images/image-footer.png";
import imageFooterLine from "../images/line-footer-mail.png";
import imageMailFour from "../images/bg-mail-four.png";
import iconFb from "../images/icon-fb-email.png";

const IndexPage = () => (
  <Layout>
    <SEO title="mail-four" />
    <header className="header-mail">
      <div className="image-header">
        <img src={GatoradeOne} alt="gatorade" title="gatorade" />
      </div>
    </header>
    <main className="mail-four" >
      <img src={imageMailFour} alt="gatorade" title="gatorade" />
      <div className="text-mail-four">
        <h1>gatorade</h1>
        <h2 className="formula">la formula optima de hidratacion para deportistas te acompaña en tu carrera a la meta</h2>
        <h2 className="thanks-buy">¡gracias <span>por tu compra!</span></h2>
        <h2 className="phone">3464512021</h2>
      </div>
      <div className="button-order">
        <a>detalles de tu orden</a>
      </div>
    </main>
    <footer className="footer-mail">
      <div className="line-footer">
        <img src={imageFooterLine} alt="gatorade" title="gatorade" />
      </div>
      <div className="icons">
        <ul>
          <li><a href="https://es-la.facebook.com/"><img src={iconFb} alt="gatorade" title="gatorade" /></a></li>
          <li><a href="https://es-la.facebook.com/"><img src={iconFb} alt="gatorade" title="gatorade" /></a></li>
          <li><a href="https://es-la.facebook.com/"><img src={iconFb} alt="gatorade" title="gatorade" /></a></li>
          <li><a href="https://es-la.facebook.com/"><img src={iconFb} alt="gatorade" title="gatorade" /></a></li>
          <li><a href="https://es-la.facebook.com/"><img src={iconFb} alt="gatorade" title="gatorade" /></a></li>
        </ul>
      </div>
      <div className="text-footer">
        <h2>Este email fue enviado a <span>jim@mail.com</span></h2>
        <h2>gatorade</h2>
      </div>
      <div className="image-inferior">
        <img src={imageFooter} alt="gatorade" title="gatorade" />
      </div>
    </footer>
  </Layout>
)

export default IndexPage

