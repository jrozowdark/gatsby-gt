import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GatoradeOne from "../images/image-header-mail.png";
import imageFooter from "../images/image-footer.png";
import imageFooterLine from "../images/line-footer-mail.png";
import imageMailFive from "../images/bg-mail-give.png";
import imageDetails from "../images/image-details.png";
import iconFb from "../images/icon-fb-email.png";

const IndexPage = () => (
  <Layout>
    <SEO title="mail-five" />
    <header className="header-mail">
      <div className="image-header">
        <img src={GatoradeOne} alt="gatorade" title="gatorade" />
      </div>
    </header>
    <main className="mail-five" >
      <img src={imageMailFive} alt="gatorade" title="gatorade" />
      <div className="text-mail-five">
        <h1>Formula optima de hidratacion para deportistas</h1>
        <h2 className="text-two">siempre <span>gatorade</span> contigo en cada recorrido</h2>
        <h2 className="text-date"> Tu fecha de entrega es: <span className="date-one">24.01.2021</span> - <span className="date-two">03.08.2021</span></h2>
        <div className="button-order">
          <a href="#">volver a tu cuenta</a>
        </div>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={imageDetails} alt="gatorade" title="gatorade" />
        </div>
        <div className="details-total">
          <div className="text-one">
            <h2 className="details-order">detalles de tu orden</h2>
            <h2 className="number-text">01 <span>prime</span></h2>
          </div>
          <div className="text-two">
            <div className="price">
              <h2 className="text-price">precio <span>3.130</span></h2>
            </div>
            <div className="units">
              <h2 className="text-units">unidades <span>20</span></h2>
            </div>
          </div>
          <div className="button">
            <a>total: <span>62.600</span></a>
          </div>
        </div>
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