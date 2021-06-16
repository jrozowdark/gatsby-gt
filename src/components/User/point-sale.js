import React, {useEffect} from "react"
import SEO from "../seo"
import Scanner from "../Scanner";
import { navigate } from 'gatsby';
class PointSale extends React.Component {

  componentDidMount(){
    const token = this.props.drupalOauthClient.isLoggedIn();
    const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${token.token_type} ${token.access_token}`
        })
      }).then(response => response.json())
      .then(json => {
        console.log(json)
        if(json.error == false){
          navigate('/user/profile')
        }
      }).catch(error => navigate('/user/profile'));

  }
  render(){
  return(
    <>
    <SEO title="buy" />
    <Scanner/>
    </>);
  }

}

export default PointSale
