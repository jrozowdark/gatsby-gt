import React from "react"
import RegisterForm from "../drupal-oauth/RegisterForm";
class Register extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div class="single-component">
        <div class="register">
          <div class="title-register">
            <h2>registro</h2>
          </div>
          <div class="form-register">
            <RegisterForm/>
          </div>
        </div>
      </div>
    )
  }
}
export default Register
