import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getTerms } from "../components/Utils/termsHelpers";
import AOS from 'aos';

const TermsPage = ({data}) => {
  const terms = data.terms.nodes.map(getTerms);
  setTimeout (function(){
    AOS.init();
  },1000)
  return (
    <Layout>
      <SEO title="terms and conditions" />
      { terms }
    </Layout>
  );
};

export default TermsPage

export const termsQuery = graphql`
  query ($slug: Int!){
    terms: allNodeArticle {
        nodes {
            drupal_internal__nid
            title
            body {
                value
            }
        }
    }
  }
`;
