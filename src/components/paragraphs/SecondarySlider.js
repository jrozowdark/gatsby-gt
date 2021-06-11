import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const SecondarySlider = ({ node }) => {

    const settings = {
      customPaging: function (i) {
        return (
          <a class="dot">
            {(i+1 < 10 ? '0'+(i+1) : '')}
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-list",
      fade: false,
      infinite: false,
      vertical: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: "secundarySlider"
    }

    const animate =  e => {
      if (e.deltaY < 0) {
        this.slickNext();
      } else {
        this.slickPrev();
      }
    }

    return (
      <div className="secundary-slider" onScroll={animate}>

        <div className="title-component" > <h2 className="font-line-black" dangerouslySetInnerHTML={{ __html: node.field_title}} /> </div>

    <Slider {...settings} >
      {node.data_slide.field_slide.map((slide) => (
        <div className="container-slick">
          <div className="text-lateral"> <h2 className="h2-lateral" dangerouslySetInnerHTML={{ __html: node.field_lateral_text}} /> </div>
          <div className="bodySlider">
            <div className="text-lateral-body">
              <h2 className="h2-text-lateral regist" dangerouslySetInnerHTML={{ __html: slide.field_title_lateral_line}} />
            </div>
            <div className="number-text">
              <h2 className="regist font-line-orange" dangerouslySetInnerHTML={{ __html: slide.field_title}} />
              <h2 className="title-slider regist" dangerouslySetInnerHTML={{ __html: slide.field_title_second_line}} />
            </div>
            <div className="pagraph-slider" dangerouslySetInnerHTML={{ __html: slide.field_description.processed}} />
            <div className="link button-fifth"><Link to={slide.field_link.uri}>{slide.field_link.title}</Link></div>
          </div>
          <div className="image d-none d-lg-block"><Img fluid={slide.image.field_image.data.field_media_image.localFile.childImageSharp.fluid} /></div>
          <div className="image d-lg-none"><Img fluid={slide.image.field_image_mobile.data.field_media_image_1.localFile.childImageSharp.fluid} /></div>
          </div>
      ))}
    </Slider>
    </div>
    );
};


export const fragment = graphql`
    fragment ParagraphSecondarySlider on paragraph__secondary_slider {
        id
        field_title
        field_lateral_text
        data_slide: relationships {
          field_slide {
            field_title_lateral_line
            field_title
            field_title_second_line
            field_description {
              processed
            }
            field_link {
              title
              uri
            }
            image: relationships{
              field_image {
                data: relationships {
                  field_media_image {
                    localFile {
                      childImageSharp {
                        fluid{
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
              field_image_mobile {
                data: relationships {
                  field_media_image_1 {
                    localFile {
                      childImageSharp {
                        fluid{
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }
`;
