import React from "react"
import RegisterForm from "../drupal-oauth/RegisterForm";
class Register extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div className="single-component">
        <div className="register">
          <div className="title-register">
            <h2>registro</h2>
          </div>
          <div className="form-register">
            <RegisterForm/>
          </div>
        </div>
      </div>
    )
  }
}
export default Register
