
import React from "react"
import { useStaticQuery, graphql } from "gatsby";
import PurchaseForm from '../drupal-oauth/PurchaseForm';
  const BuyFunctions = (props) => {
    console.log("BF",props)
    const data = useStaticQuery(graphql `
      query {
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
    `);
    return (<PurchaseForm data={data} pid={props.pid}/> );
}

export default BuyFunctions;
