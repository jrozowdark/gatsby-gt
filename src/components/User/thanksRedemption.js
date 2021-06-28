import React from "react"
import SEO from "../seo"
import { Link, navigate } from "gatsby"

class ThanksRedemption extends React.Component {
  state = {
    uid: false,
    products: null,
    packs: {},
    user: {},
    total: 0
  }
  componentDidMount() {
    const token = this.props.drupalOauthClient.isLoggedIn();
    if (token != undefined) {
      if (localStorage.getItem('redem') !== null) {
        localStorage.removeItem('redem');
      }
      if (localStorage.getItem("product-redemption") === null){
        navigate("/staff/zone")
      }
      const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/validate?_format=json`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': `${token.token_type} ${token.access_token}`
          })
        }).then(response => response.json())
        .then(json => {
          if (json.error == false) {
            this.setState({
              access: false
            })
            // navigate('/user/profile')
          } else {
            let products = localStorage.getItem("product-redemption");
            this.setState({
              access: true,
              "products": JSON.parse(products)
            })
          }

        }).catch(error => console.log(error));
    }
  }

  render() {
    if (this.state.access) {
      let products = this.state.products;

    return (
    <div class="thanks">
      <SEO title="Thanks for you redemption" />
      <div class="tanks-component-fisrt">
        <div class="text-tanks">
          <div class="text-one">
            <h2>¡Es hora de hidratarte con la bebida Nº 1 de deportistas!</h2>
          </div>
          <div class="text-two">
            <h2>resumen de la redención</h2>
          </div>
          <div class="text-three">
            <h2 class="text-number">01</h2>
          </div>
          <div class="text-four">
            <div class="unit">
              <h2 class="number-units">Sabor:</h2>
              <h2 class="fruit">{products !== null ? products.title : ""}</h2>
            </div>
          </div>
          <div class="button-second">
            <Link to="/staff/zone">Finalizar</Link>
            </div>
        </div>
      </div>
    </div>
    )
    } else {
      return ('')
    }
  }
}

export default ThanksRedemption
