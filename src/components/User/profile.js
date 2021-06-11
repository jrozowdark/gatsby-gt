import React from "react"
import UserInfo from "./Profile/UserInfo";
class Profile extends React.Component {
  state = {
    uid: false,
  }
  componentDidMount() {
    const token = this.props.drupalOauthClient.isLoggedIn();
    this.setState({
      uid: token.dump
    })
  }

  render() {
    return (
        <UserInfo data={parseInt(this.state.uid)} />
    )
  }
}

export default Profile
