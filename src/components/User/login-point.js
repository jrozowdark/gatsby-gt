import React from "react"
import LoginFormStaff from "../drupal-oauth/LoginFormStaff";
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
              <LoginFormStaff r="/staff/zone"/>
            </div>
        </div>
      </div>
    )
  }
}

export default LoginPoint;
