import React from "react"
import SEO from "../seo"
import { navigate } from 'gatsby';
import RedemptionForm from "../drupal-oauth/RedemptionForm";
import Redemption from "./Redemption";
class PointSaleRedemption extends React.Component {
  state = {
    redem : ''
  }
  componentDidMount(){
    const token = this.props.drupalOauthClient.isLoggedIn();
   if (token != undefined) {
    const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        this.setState({'redem':localStorage.getItem('redem')})
      }).catch(error => navigate('/user/profile'));
      const service_b = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/getdatauser?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        console.log(json)
        if(!json.message){
          const products = json.data.purchased_products != undefined ? json.data.purchased_products : {};
          this.setState({
            products: products
          })
        }else{
          return false;
        }

      }).catch(error => console.log('error', error));
      this.setState({
        uid: token.dump
      })
   }
  }
  render(){
    console.log(this.state.redem)
  return(
    <>
    <SEO title="buy" />
    <div className="zone container-fluid">
      <div className="row">
        <Redemption redem={this.state.redem}/>
      </div>
    </div>
    </>);
  }

}

export default PointSaleRedemption
