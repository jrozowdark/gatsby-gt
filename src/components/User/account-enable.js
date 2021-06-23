import React from "react"
import SEO from "../seo"
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
class AccountEnable extends React.Component {
  state = {
    uid: false,
    products: {},
    packs: {},
    user: {},
    total: 0
  }
  componentDidMount() {
      const data = {'mail' :{"value": this.props.id}};
      const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/service/user/enable?_format=json`, {
        method: 'POST',
        headers: new Headers({
           'Content-Type': 'application/json',
           'Accept': 'application/json',
        }),
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(json => {
        if(json.message){
          navigate('/user/login');
        }
      }).catch(error => console.log('error', error));
  }

  render() {
    return (
    <div className="regist-full container-fluid">
      <div className="row">
        <div className="box-register col-12 col-sm-6">
          <h2>registro exitoso</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="button-first">
            <Link to="/user/login"> ir a mi cuenta </Link>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default AccountEnable
