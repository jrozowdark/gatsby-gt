import React from "react";
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image";
import RedirectLoggedPacks from '../RedirectLoggedPacks';
export const getPack = node => {
  return (<div className="container-buy" key={node.drupal_internal__nid} >
    <div className="text-buy-lateral">
      <h2>{node.title}</h2>
    </div>
    <div className="body-buy">
      <div className="image-buy">
        <StaticImage className="image-bg-buy"
          src="../../images/bg-container-buy.png"
          // width={300}
          // height={500}
          objectFit="cover"
          quality={99}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Logo gatorade"
        />
      </div>
      <div className="title-image-buy">
        <div className="title-buy">
          <h2 className="title-lateral">{node.field_lateral_title}</h2>
          <h2 className="title-one font-line-orange">{node.field_title}</h2>
          <h2 className="font-gatorade-light">{node.field_lateral_title} <strong>{node.field_quantity_bottles} Botellas</strong></h2>
          <p className="price-pack">Precio: ${node.field_price}</p>
        </div>
        <div className="paragraph-buy" dangerouslySetInnerHTML={{ __html: node.field_description.processed }} />
        <div className="image-buy-two">
          <div className="image-bg-benefits"><Img fluid={node.background.field_image.localFile.childImageSharp.fluid} /></div>
        </div>
        <div className={[node.field_unique]}></div>
      </div>
      <RedirectLoggedPacks title={node.field_link.title} pid={node.drupal_internal__nid}/>
    </div>
  </div>);
  };
