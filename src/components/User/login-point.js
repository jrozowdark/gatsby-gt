import React from "react"
import LoginForm from "../drupal-oauth/LoginForm";
import SEO from "../seo"
import drupalOauth from '../drupal-oauth/drupalOauth';
import withDrupalOauthProvider from '../drupal-oauth/withDrupalOauthProvider';
class LoginPoint extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div>
        <SEO title="login" />
        <div className="login">
            <div className="box-form">
              <LoginForm r="/user/zone"/>
            </div>
        </div>
      </div>
    )
  }
}
const drupalOauthClient = new drupalOauth({
  drupal_root: process.env.GATSBY_DRUPAL_ROOT,
  client_id: '4e6a7f86-fefe-45ed-b12e-5c71fd2a9851',
  client_secret: 'master',
  scope: 'vendedor',
});
export default withDrupalOauthProvider(drupalOauthClient, LoginPoint);
