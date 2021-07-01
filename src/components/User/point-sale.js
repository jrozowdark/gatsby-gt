import React, {useEffect} from "react"
import SEO from "../seo"
import Scanner from "../Scanner";
import { navigate } from 'gatsby';
class PointSale extends React.Component {
  state = {
    access: false
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
          console.log(json)
          if(json.error == false){
            this.setState({access: false})
            // navigate('/user/profile')
          }else{
          this.setState({access: true})
          }

        }).catch(error => console.log(error));
      if (localStorage.getItem("product-redemption") !== null){
        localStorage.removeItem("product-redemption");
      }
    }
  }
  render(){
      return(
        <>
        <SEO title="buy" />
        <Scanner access={this.state.access}/>
        </>);
  }

}

export default PointSale
