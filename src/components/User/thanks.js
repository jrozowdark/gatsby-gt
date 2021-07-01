import React from "react"
import SEO from "../seo"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
class Thanks extends React.Component {
  state = {
    uid: false,
    products: {},
    packs: {},
    user: {},
    total: 0
  }
  componentDidMount() {
    const token = this.props.drupalOauthClient.isLoggedIn();
   if( token != undefined && token.dump != undefined) {
      const data = {'id' : this.props.id, 'uid' : token.dump};
      const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/mp_transactions/thanks?_format=json`, {
        method: 'POST',
        headers: new Headers({
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Authorization': `${token.token_type} ${token.access_token}`
        }),
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(json => {
        console.log(json)
        if(!json.message){
          console.log("json", json)
          const products = json.data.purchased_products != undefined ? json.data.purchased_products : {};
          const packs = json.data.packs != undefined ? json.data.packs : {};
          this.setState({
            products: products,
            packs: packs,
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

  render() {
    return (
    <div class="thanks">
      <SEO title="Thanks" />
      <div class="tanks-component-fisrt">
        <div class="text-tanks">
          <div class="text-one">
            <h2>gracias por tu compra</h2>
          </div>
          <div class="text-two">
            <h2>resumen de la compra</h2>
          </div>
          <div class="text-three">
            <h2 class="text-rotate">pack</h2>
            <h2 class="text-number">{this.state.packs.pack_title}</h2>
            <h2 class="text-ultimate">pack</h2>
          </div>
          <div class="text-four">
            {Object.keys(this.state.products != undefined ? this.state.products : {}).map((step, k) => (
                <div className="unit">
                  <h2 className="text-rotate"></h2>
                  <h2 className="fruit">{this.state.products[step].product} </h2>
                  <h2 className="number-units">{this.state.products[step].quantity} Unidades</h2>
                </div>
            ))}
          </div>
          <div class="button-second">
            <Link to="/">ingresa</Link>
            </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Thanks
