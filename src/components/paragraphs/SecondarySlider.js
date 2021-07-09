import React, {useEffect} from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
export const SecondarySlider = ({ node }) => {
    useEffect(() => {
      AOS.init({ duration:2000 });
    },[]);
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
        let imageOne = slide.image.one !== null ? slide.image.one : JSON.stringify({});
        let imageTwo = slide.image.two !== null ? slide.image.two : JSON.stringify({});
        let imageThree = slide.image.three !== null ? slide.image.three : JSON.stringify({});
        let imageFour = slide.image.four !== null ? slide.image.four : JSON.stringify({});
        const images = [];
        if (Object.keys(imageDesk).length !== 0 && imageDesk.constructor === Object) {
          imageDesk = slide.image.desktop.data.field_media_image.localFile.childImageSharp.fluid;
          images.push(imageDesk);
        } else {
          imageDesk = {};
        }
        if (Object.keys(imageOne).length !== 0 && imageOne.constructor === Object) {
          imageOne = slide.image.one.data.field_media_image_2.localFile.childImageSharp.fluid;
          images.push(imageOne);
        } else {
          imageOne = {};
        }
        if (Object.keys(imageTwo).length !== 0 && imageTwo.constructor === Object) {
          imageTwo = slide.image.two.data.field_media_image_3.localFile.childImageSharp.fluid;
          images.push(imageTwo);
        } else {
          imageTwo = {};
        }
        if (Object.keys(imageThree).length !== 0 && imageThree.constructor === Object) {
          imageThree = slide.image.three.data.field_media_image_4.localFile.childImageSharp.fluid;
          images.push(imageThree);
        } else {
          imageThree = {};
        }
        if (Object.keys(imageFour).length !== 0 && imageFour.constructor === Object) {
          imageFour = slide.image.four.data.field_media_image_5.localFile.childImageSharp.fluid;
          images.push(imageFour);
        } else {
          imageFour = {};
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
                <h2 className="regist font-line-orange" data-aos="fade-up" data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_title}} />
                <h2 className="title-slider regist" data-aos="fade-up" data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_title_second_line}} />
              </div>
              <div className="pagraph-slider" data-aos="zoom-in"  data-aos-offset="0" dangerouslySetInnerHTML={{ __html: slide.field_description.processed}} />
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
              imageOne: field_image_one {
                datamobile: relationships {
                  field_media_image_2 {
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
              imageTwo: field_image_two {
                datamobile: relationships {
                  field_media_image_3 {
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
              imageThree: field_image_three {
                datamobile: relationships {
                  field_media_image_4 {
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
              imagefour: field_image_four {
                datamobile: relationships {
                  field_media_image_5 {
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
