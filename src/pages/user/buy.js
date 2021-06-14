import React, { useState} from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import "../../sass/base/_fonts.scss"
import GatoradeOne from "../../images/gatorade-red.png";
import { graphql } from "gatsby";
import PurchaseForm from '../../components/drupal-oauth/PurchaseForm';
const IndexPage = ({ data }) => {
  return(
  <Layout>
    <SEO title="buy" />

    <div className="container bg-malla">
      <div className="row row-bg">
        <div className="col-12 col-lg-6 text-image-orden">
          <div className="text">
            <h2><span>tu </span>orden</h2>
          </div>
          <div className="image-gatorade">
            <img src={GatoradeOne} alt="gatorade" title="gatorade" />
          </div>
        </div>
        <div className="col-12 col-lg-6 container-texts">
          <PurchaseForm data={data}/>
        </div>
      </div>
    </div>
  </Layout>);
}

export default IndexPage


export const pageQuery = graphql `
    {
        packs: allNodePack {
            nodes {
                drupal_internal__nid
                title
                field_lateral_title
                field_title
                field_title_second_line
                field_quantity_bottles
            }
        }
        products: allNodeProduct {
          nodes {
            title
            field_unique
          }
        }
    }
`;
