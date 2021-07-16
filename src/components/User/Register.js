import React from "react"
import RegisterForm from "../drupal-oauth/RegisterForm";
import { navigate } from 'gatsby';
class Register extends React.Component {
  state = {
    code: ``,
  }
  componentDidMount(){
      const token = undefined;
      const params = new URLSearchParams(this.props.location.search);
      const code_data = params.get("code");
      console.log(this.props);
      console.log(params)
      console.log(code_data)
       if (code_data !== null) {
        const service = fetch(`${process.env.GATSBY_DRUPAL_ROOT}/service/user/code`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({"code" : code_data})
        }).then(response => response.json())
        .then(json => {
          console.log(json)
          if(json.error === false){
            this.setState({access: false})
            navigate('/user/login')
          }else{
          this.setState({access: true,code: code_data})
          }

        }).catch(error => console.log(error));
       }
  }
  render() {
    return (
      <div className="single-component">
        <div className="register">
          <div className="title-register">
            <h2>registro</h2>
          </div>
          <div className="form-register">
            <RegisterForm code ={this.state.code}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Register
