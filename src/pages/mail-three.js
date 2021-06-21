import * as React from "react";

import Layout from "../components/layout"
import SEO from "../components/seo"

import GatoradeOne from "../images/image-header-mail.png";
import imageFooter from "../images/image-footer.png";
import imageFooterLine from "../images/line-footer-mail.png";
import imageMailThree from "../images/bg-mail-three.png";

const IndexPage = () => (
  <Layout>
    <SEO title="mail-three" />
    <header className="header-mail">
      <div className="image-header">
        <img src={GatoradeOne} alt="gatorade" title="gatorade" />
      </div>
    </header>
    <main className="mail-three" >
      <img src={imageMailThree} alt="gatorade" title="gatorade" />
      <div className="text-mail-three">
        <h1>recarga energia con <span>gatorade</span></h1>
        <h2 className="formula">la formula optima de hidratacion para deportistas</h2>
        <h2 className="verification">codigo de verificacion <span>24012021</span></h2>
      </div>
      <div className="button-redeem">
        <a>redime ahora</a>
      </div>
    </main>
    <footer className="footer-mail">
      <div className="line-footer">
        <img src={imageFooterLine} alt="gatorade" title="gatorade" />
      </div>
      <div className="icons">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
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

