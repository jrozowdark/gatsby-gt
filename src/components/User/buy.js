import React, {useEffect} from "react"
import SEO from "../seo"
import GatoradeOne from "../../images/gatorade-red.png";
import BuyFunctions from './buyFunction';
class Buy extends React.Component {

  componentDidMount(){
  }
  render(){
    console.log("this",this.props.id)
  return(
    <>
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
          <BuyFunctions pid={this.props.id}/>
        </div>
      </div>
    </div>
    </>);
  }

}

export default Buy
