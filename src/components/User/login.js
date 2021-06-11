import React from "react"
import LoginForm from "../drupal-oauth/LoginForm";
import SEO from "../seo"
class Login extends React.Component {
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
              <LoginForm/>
            </div>
        </div>
      </div>
    )
  }
}
export default Login
