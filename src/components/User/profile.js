import React from "react"
import UserInfo from "./Profile/UserInfo";
import Spinner from 'react-bootstrap/Spinner'
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
    if (this.state.uid !== false){
      return (
          <UserInfo data={parseInt(this.state.uid)} />
      )
    }else{
      return (<div></div>);
    }
  }
}

export default Profile
