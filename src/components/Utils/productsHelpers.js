import React from "react";
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Img from "gatsby-image";
export const getPack = node => {
  console.log(node)
  return (<div class="container-buy" >
    <div class="text-buy-lateral">
      <h2>{node.title}</h2>
    </div>
    <div class="body-buy">
      <div class="image-buy">
        <StaticImage class="image-bg-buy"
          src="../../images/bg-container-buy.png"
          // width={300}
          // height={500}
          objectFit="cover"
          quality={99}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Logo gatorade"
        />
      </div>
      <div class="title-image-buy">
        <div class="title-buy">
          <h2 class="title-lateral">{node.field_lateral_title}</h2>
          <h2 class="title-one font-line-orange">{node.field_title}</h2>
          <h2 class="font-gatorade-light">{node.field_lateral_title} <strong>{node.field_quantity_bottles} Botellas</strong></h2>
          <p class="price-pack">Precio: ${node.field_price}</p>
        </div>
        <div class="paragraph-buy" dangerouslySetInnerHTML={{ __html: node.field_description.processed }} />
        <div class="image-buy-two">
          <div class="image-bg-benefits"><Img fluid={node.background.field_image.localFile.childImageSharp.fluid} /></div>
        </div>
      </div>
      <div class="button-second">
        <Link
          to="/user/login"
        >
          {node.field_link.title}
        </Link>
      </div>
    </div>
  </div>);

  {/* <div class="fourth-component">
<div class="text-buy">
  <h2 class="font-line-black">compra</h2>
  <h3>tu pack</h3>
</div>
<div class="container-buy">
  <div class="body-buy">
    <div class="image-buy">
      <StaticImage class="image-bg-buy"
        src="../images/image-regist.png"
        // width={300}
        // height={500}
        objectFit="cover"
        quality={99}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="Logo gatorade"
      />
    </div>
    <div class="title-image-buy">
      <div class="title-buy">
        <h2 class="title-one font-gatorade-light">pack</h2>
        <h2 class="font-line-orange">camise</h2>
      </div>
      <div class="paragraph-buy">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      <div class="image-buy-two">
        <StaticImage class="image-bg-buy"
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
    <div class="button-dowload-buy">
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
  <div class="text-buy-lateral">
    <h2>mi camiseta</h2>
  </div>
</div>
</div>) */}
  // return <ul>{node_data}</ul>;
};
