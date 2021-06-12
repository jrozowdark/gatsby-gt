import React from "react";
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image";
export const getPack = node => {
  console.log(node)
  return (<div className="container-buy" >
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
      </div>
      <div className="button-seven">
        <Link
          to="/user/login"
        >
          {node.field_link.title}
        </Link>
      </div>
    </div>
  </div>);

  {/* <div className="fourth-component">
<div className="text-buy">
  <h2 className="font-line-black">compra</h2>
  <h3>tu pack</h3>
</div>
<div className="container-buy">
  <div className="body-buy">
    <div className="image-buy">
      <StaticImage className="image-bg-buy"
        src="../images/image-regist.png"
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
        <h2 className="title-one font-gatorade-light">pack</h2>
        <h2 className="font-line-orange">camise</h2>
      </div>
      <div className="paragraph-buy">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      <div className="image-buy-two">
        <StaticImage className="image-bg-buy"
          src="../images/camisa-buy.png"
          // width={300}
          // height={500}
          objectFit="contain"
          quality={99}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Logo gatorade"
        />
      </div>
    </div>
    <div className="button-dowload-buy">
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        Recargar
    </Link>
    </div>
  </div>
  <div className="text-buy-lateral">
    <h2>mi camiseta</h2>
  </div>
</div>
</div>) */}
  // return <ul>{node_data}</ul>;
};
