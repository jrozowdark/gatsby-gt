import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link, navigate } from 'gatsby';
import {Form} from "react-bootstrap"
class RecoveryPasswordForm extends React.Component {
  state = {
    processing: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    error: null,
  };

  validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username.includes("@", ".")) {
      usernameError = "Correo electronico invalido";
    }
    if (usernameError) {
      this.setState({usernameError});
      return false;
    };
    return true;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ processing: true });
      const { username } = this.state;

      try {
        await this.props.drupalOauthClient.handleRecoveryPassword(username).then(receive => receive)
          .then(json => {
            console.log("json",json)
            if (json.message === undefined) {
              this.setState({ processing: false });
              this.setState({
                processing: false,
                error: "Revisa tú correo electrónico para recuperar tú contraseña",
              });
              // this.props.updateAuthenticatedUserState(true);
                // navigate(`${this.props.r}`)
            }else{
              this.setState({
                processing: false,
                error: json.message,
              });
            }
          });
      } catch(err) {
        this.setState({
          processing: false,
          error: 'No se pudo completar su solicitud de inicio de sesión.',
        });
      }
    }
  };

  render() {
    const { error, processing } = this.state;
    if (this.props.userAuthenticated) {
      navigate(`${this.props.r}`)
    }
    return (
       <>
          { processing ?
            <div>Loading ...</div>
            :<>
            { error && <Form.Text >{error} </Form.Text>}
            <form onSubmit={ event => this.handleSubmit(event)}>
              <div className="title-form">
                <h2>Recuperar contraseña</h2>
              </div>
              <Form.Group className={ error ? 'error' : ''} controlId="formBasicText">
                <Form.Control type="text" placeholder="Ingresa tú correo" name="username" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div className="text-error error-authentication">{this.state.usernameError}</div>
              </Form.Group>
              <Link className="link-text" to="/user/login">¿Tienes Cuenta?</Link>
              <div className="link button-fifth">
               <input type="submit" value="ingresa" onClick={ event => this.handleSubmit(event)} />
              </div>
              <Link className="link-text" to="/user/register">No tienes cuenta</Link>
            </form></>
          }
        </>
    );
  }
}

export default withDrupalOauthConsumer(RecoveryPasswordForm);
