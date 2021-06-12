import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { getParagraph } from "../components/Utils/paragraphHelpers";
import { getPack } from "../components/Utils/productsHelpers";

const PageTemplate = ({ data }) => {
    const paragraphs = data.page.relationships.paragraphs.map(getParagraph);
    const packs = data.packs.nodes.map(getPack);
    console.log(packs)
    return (
        <Layout>
            {/* <h1>{data.page.title}</h1> */}
            {paragraphs}
            <div className="fourth-component">
                <div className="text-buy">
                    <h2 className="font-line-black">compra</h2>
                    <h3>tu pack</h3>
                </div>
                {packs}
            </div>
        </Layout>
    );
};

export default PageTemplate;

export const pageQuery = graphql`
    query($slug: String!) {
        page: nodePrincipalPage(fields: { slug: { eq: $slug } }) {
            id
            title
            relationships {
                paragraphs: field_option_list {
                    type: __typename
                    ...ParagraphPrincipalSlider
                    ...ParagraphSecondarySlider
                    ...ParagraphBenefits
                }
            }
        }
        packs: allNodePack {
            nodes {
                title
                background: relationships {
                    field_image {
                        localFile {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
                field_lateral_title
                field_title
                field_title_second_line
                field_description {
                    processed
                }
                field_link {
                    title
                    uri
                }
                field_quantity_bottles
                field_price
            }
        }
    }
`;
