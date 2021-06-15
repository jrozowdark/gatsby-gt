import React from "react"
import SEO from "../seo"
import { navigate } from 'gatsby';
class PointSaleRedemption extends React.Component {
  state = {
    redem : ''
  }
  componentDidMount(){
    const token = this.props.drupalOauthClient.isLoggedIn();
    const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        this.setState({'redem':localStorage.getItem('redem')})
      }).catch(error => navigate('/user/profile'));
  }
  render(){
    console.log(this.state.redem)
  return(
    <>
    <SEO title="buy" />
    <div className="container bg-malla">
    Redemption
    </div>
    </>);
  }

}

export default PointSaleRedemption
