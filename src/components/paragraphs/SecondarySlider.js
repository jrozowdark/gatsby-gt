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
          <a href="/#" className="dot">
            {(i+1 < 10 ? '0'+(i+1) : '')}
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-list",
      fade: false,
      infinite: true,
      // vertical: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: "secundarySlider",
      lazyLoad: 'ondemand',
    }

    const animate =  e => {
      if (e.deltaY < 0) {
        this.slickNext();
      } else {
        this.slickPrev();
      }
    }
    return (
      <div id="secundary-slider" className="secundary-slider" onScroll={animate} >

        <div className="title-component" id="secundary-slider" > <h2 className="font-line-black" dangerouslySetInnerHTML={{ __html: node.field_title}} /> </div>

    <Slider {...settings} >
      {node.data_slide.field_slide.map((slide, i) => {
        let imageDesk = slide.image.desktop !== null ? slide.image.desktop : JSON.stringify({});
        let imageMob = slide.image.mobile !== null ? slide.image.mobile : JSON.stringify({});
        const images = [];
        if (Object.keys(imageDesk).length !== 0 && imageDesk.constructor === Object) {
          imageDesk = slide.image.desktop.data.field_media_image.localFile.childImageSharp.fluid;
          images.push(imageDesk);
        } else {
          imageDesk = {};
        }
        if (Object.keys(imageMob).length !== 0 && imageMob.constructor === Object){
          imageMob = {
            ...slide.image.mobile.datamobile.field_media_image_1.localFile.childImageSharp.fluid,
            media: `(max-width: 992px)`
          };
          images.push(imageMob);
        }else{
          imageMob = {};
        }
        return (
          < div className = {`container-slick position-${(i+1)%2 ? 'rigth': 'left'}`} key = {i} >
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
              <div className="link button-six"><Link to={slide.field_link.uri.replace('internal:/','')}>{slide.field_link.title}</Link></div>
            </div>
            <div className="image"><Img fluid={images} alt ={slide.image.desktop.data.field_media_image.filename}  /></div>
          </div>
        );
      })}
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
              desktop: field_image {
                data: relationships {
                  field_media_image {
                    filename
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
              mobile: field_image_mobile {
                datamobile: relationships {
                  field_media_image_1 {
                    filename
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
