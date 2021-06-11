import React from 'react';
import QRCode from "qrcode.react"
import { useStaticQuery, graphql } from "gatsby";
import UpdateUserForm from "../../drupal-oauth/UpdateUserForm"
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from "gatsby"

const UserInfo = (props) => {

  const data = useStaticQuery(graphql`
    query{
      allUserUser {
        edges {
          node {
            drupal_internal__uid
            id
            display_name
            field_name
            field_lastname
            field_born_date(formatString: "DD/MM/Y")
            field_bike_type
            field_phone
          }
        }
      }
    }
  `);
  const edges = data.allUserUser.edges;
  return (
    edges.map(function (usr, i) {
      if (usr.node.drupal_internal__uid === props.data) {
        return (
          <div key={i}>
            <div className="principal-banner-qr">
              <div className="text-lateral">
                <h2 className="text-packs">mis packs</h2>
              </div>
              <div className="bg-image-qr">
                <StaticImage className="bg-qr" src="../../../images/bg-ultimate-qr.png" objectFit="cover"
                  quality={99} formats={["AUTO", "WEBP", "AVIF"]} alt="logo gatorade" />
              </div>
              <div className="welcome">
                <h2><span className="text-welcome">Bienvenido</span>
                  <span className="welcome-name">{usr.node.field_name} <span>{usr.node.field_lastname}</span></span></h2>
              </div>
              <div className="welcome-qr">
                <QRCode value={usr.node.field_name} class="d-flex" size="900" includeMargin fgColor="#FB5030" bgColor="transparent" level='H' />
              </div>
              <div class="description-qr">
                <div class="decription-title">
                  <h2 class="number">72</h2>
                  <h2 class="bottle">botellas</h2>
                </div>
                <div class="decription-units">
                  <div class="unit">
                    <h2 class="text-rotate">pack</h2>
                    <h2 class="number-one">01</h2>
                    <h2 class="number-two">2</h2>
                    <h2 class="text-end">un</h2>
                  </div>
                </div>
              </div>
              <div class="button-second">
                <a href="/">recargar</a>
              </div>
            </div>
            <div className="account-update">
              <div class="text-buy">
                <h2 class="font-line-black">mis</h2>
                <h3>compra</h3>
              </div>
              <div className="container-update">
                <div className=""></div>
                <div className="image-bg-update">
                  <StaticImage className="bg-update" src="../../../images/bg-update.png" objectFit="cover"
                    quality={99} formats={["AUTO", "WEBP", "AVIF"]} alt="logo gatorade" />
                </div>
                <UpdateUserForm data={usr.node} />
              </div>
            </div>
            <div class="ultimate-component">
              <div class="text-buy">
                <h2 class="font-line-black">mis</h2>
                <h3>compra</h3>
              </div>
              <div class="container-ultimate">
                <div class="background-image-ultimate">
                  <StaticImage class="image-bg-ultimate"
                    src="../../../images/bg-ultimate-qr.png"
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
                    src="../../../images/camisa-buy.png"
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
                  <div class="button-fifth">
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
        )
      }
    })
  )
}

export default UserInfo;
