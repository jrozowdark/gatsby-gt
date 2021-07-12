import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AOS from 'aos';

const TermsPage = ({data}) => {
  console.log(data);
  // const terms = data.page.map(getTerms);
  // setTimeout (function(){
  //   AOS.init();
  // },1000)
  return (
    <Layout>
      <SEO title={data.page.title} />
      <h1 dangerouslySetInnerHTML={{
            __html: data.page.title,
          }}></h1>
        <div
          className="data-article"
          dangerouslySetInnerHTML={{
            __html: data.page.body.value,
          }}
        />
    </Layout>
  );
};

export default TermsPage

export const termsQuery = graphql`
  query($slug: String!) {
      page: nodeArticle(fields: { slug: { eq: $slug } }) {
          id
          title
          body {
            value
          }
      }
  }
`;
