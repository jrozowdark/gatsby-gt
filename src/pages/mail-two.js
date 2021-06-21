import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GatoradeOne from "../images/image-header-mail.png";
import imageFooter from "../images/image-footer.png";
import imageFooterLine from "../images/line-footer-mail.png";
import imageQr from "../images/image-qr-mail.png";
import imageMailTwo from "../images/image-mail-two.png";
import iconFb from "../images/icon-fb-email.png";


const IndexPage = () => (
  <Layout>
    <SEO title="mail-two" />
    <header className="header-mail">
      <div className="image-header">
        <img src={GatoradeOne} alt="gatorade" title="gatorade" />
      </div>
    </header>
    <main className="mail-two" >
      <img src={imageMailTwo} alt="gatorade" title="gatorade" />
      <div className="text-mail-two">
        <h1 className="title">La bebida deportiva <span>Nº 1 del mundo</span></h1>
        <h2 className="thanks">gracias <span>por escoger</span></h2>
        <h2 className="gatorade">gatorade</h2>
        <h2 className="successful">¡Registro exitoso!</h2>
        <p>Utiliza el siguiente código para redimir tu obsequio en los puntos de hidratación de tu ruta preferida</p>
      </div>
      <div className="image-qr">
        <img src={imageQr} alt="gatorade" title="gatorade" />
      </div>
      <div className="button-buy">
        <a>comprar ahora</a>
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

