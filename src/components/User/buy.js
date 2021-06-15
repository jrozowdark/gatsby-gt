import React, {useEffect} from "react"
import SEO from "../seo"
import GatoradeOne from "../../images/gatorade-red.png";
import BuyFunctions from './buyFunction';
class Buy extends React.Component {

  componentDidMount(){
  }
  render(){
  return(
    <>
    <SEO title="buy" />
    <div className="container-fluid buy">
      <div className="row">
        <div className="col-12 col-lg-6 left-side">
          <h2><span>tu </span><br/>orden</h2>
          <div className="image-gatorade">
            <img src={GatoradeOne} alt="gatorade" title="gatorade" />
          </div>
        </div>
        <div className="col-12 col-lg-6 container-texts">
          <BuyFunctions pid={this.props.id != undefined ? this.props.id : 0 }/>
        </div>
      </div>
    </div>
    </>);
  }
}

export default Buy
