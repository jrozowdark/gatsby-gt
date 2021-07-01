import React from "react"
import SEO from "../seo"
import ChangePasswordForm from "../drupal-oauth/ChangePasswordForm";
class ChangePassword extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  render() {
    return (
      <div>
        <SEO title="recover-password" />
        <div className="login recover-password">
            <div className="box-form">
              <ChangePasswordForm r="/user/login" id={this.props.id} time={this.props.time} hash={this.props.hash}/>
            </div>
        </div>
      </div>
    )
  }
}
export default ChangePassword
