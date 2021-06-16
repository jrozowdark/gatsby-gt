import React, { useEffect } from 'react';
import QRCode from "qrcode.react"
import { useStaticQuery, graphql } from "gatsby";
import UpdateUserForm from "../../drupal-oauth/UpdateUserForm"
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from "gatsby"

import Logocarlos from "../../../images/bg-ultimate-qr.png";
import bgQr from "../../../images/bg-ultimate-qr.png";

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
            field_qr_code
          }
        }
      }
    }
  `);
  const edges = data.allUserUser.edges;
  let packs = props.packs;
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
                {/* <StaticImage className="bg-qr" src="../../../images/bg-ultimate-qr.png" objectFit="cover"
                  quality={99} formats={["AUTO", "WEBP", "AVIF"]} alt="logo gatorade" /> */}
                {/* <img src={Logocarlos} alt="logo-gatorade" title="gatorade" /> */}
                <div className="bg-qr">
                  <img src={bgQr} alt="Background QR" title="background QR" />
                </div>
              </div>
              <div className="welcome">
                <h2><span className="text-welcome">Bienvenido</span>
                  <span className="welcome-name">{usr.node.field_name} <span>{usr.node.field_lastname}</span></span></h2>
              </div>
              <div className="welcome-qr">
                <QRCode value={usr.node.field_qr_code != null ? usr.node.field_qr_code : ''} className="d-flex" size={900} includeMargin fgColor="#FB5030" bgColor="transparent" level='H' />
              </div>
              <div className="description-qr">
                <div className="decription-title">
                  < h2 className="number" > {props.total} </h2>
                  <h2 className="bottle">botellas</h2>
                </div>
                {
                  Object.keys(props.products != undefined ? props.products : {}).map((step, k) => (
                    <div className="decription-units" key={`u-${k}`}>
                      <div className="unit">
                        <h2 className="text-rotate"></h2>
                        <h2 className="number-one">{props.products[step].product}</h2>
                        <h2 className="number-two">{props.products[step].quantity}</h2>
                        <h2 className="text-end">un</h2>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="button-second">
                <a href="/user/buy">recargar</a>
              </div>
            </div>
            <div className="account-update">
              <div className="text-buy">
                <h2 className="font-line-black">mis</h2>
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
            <div className="ultimate-component">
              <div className="text-buy">
                <h2 className="font-line-black">mis</h2>
                <h3>compra</h3>
              </div>
              {Object.keys(props.packs != undefined ? props.packs : {}).map((step, k) => (
                <div className="container-ultimate" key={`p-${step}`}>
                  <div class="background-image-ultimate">
                    <div className="image-bg-ultimate">
                      <img className="image-bg-ultimate" src={Logocarlos} alt="logo-gatorade" title="gatorade" />
                    </div>
                    {/* <StaticImage class="image-bg-ultimate"
                      src="../../../images/bg-ultimate-qr.png"
                      objectFit="cover"
                      quality={99}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Logo gatorade"
                    /> */}
                    {/* <StaticImage className="image-bg-ultimate" src="/../../images/bg-ultimate-qr.png" objectFit="cover"
                      quality={99} formats={["AUTO", "WEBP", "AVIF"]} alt="logo gatorade" /> */}

                  </div>
                  <div className="image-ultimate">
                    <img className="camisa-buy"
                      src={packs[step].pack_image}
                      alt="Logo gatorade"
                    />
                  </div>
                  <div className="description-ultimate">
                    {
                      Object.keys(props.packs[step].products ? props.packs[step].products : {}).map((p, k) => {
                        return (
                          <div className="title" key={`u-${k}`}>
                            {/* <h2 className="taste">{props.packs[step].products[p].product}</h2> */}
                            <h5 className="text-rotate">{props.packs[step].pack_title_lateral}</h5>
                            <h2 className="font-line-orange title-mobile">{props.packs[step].products[p].quantity} botellas</h2>
                            <h2 className="font-line-orange title-desktop">{props.packs[step].pack_title}</h2>
                            <h2 className="third-text">pack</h2>
                          </div>
                        )
                      })}
                    {/* <div className="title">
                      <h5 className="text-rotate">{props.packs[step].pack_title_lateral}</h5>
                      <h2 className="font-line-orange">{props.packs[step].pack_title}</h2>
                      <h2 className="third-text">pack</h2>
                    </div> */}
                    <div className="units">
                      {
                        Object.keys(props.packs[step].products ? props.packs[step].products : {}).map((p, k) => {
                          return (
                            <div className="unit" key={`u-${k}`}>
                              <h2 className="taste">{props.packs[step].products[p].product}</h2>
                              <h2 className="amount">{props.packs[step].products[p].quantity} unidades</h2>
                            </div>
                          )
                        })}
                    </div>
                    <div className="button-fifth">
                      <Link
                        to={`/user/buy/${props.packs[step].pack_buy}`}
                        style={{
                          textDecoration: `none`,
                        }}
                      >
                        Recargar
                    </Link>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="container-ultimate">
                <div className="image-ultimate">
                  <StaticImage className="camisa-buy"
                    src="../../../images/camisa-buy.png"
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
                  <div className="button-fifth">
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
              </div> */}
            </div>
          </div>
        )
      }
    })
  )
}

export default UserInfo;
