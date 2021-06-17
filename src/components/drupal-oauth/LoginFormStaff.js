import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link, navigate } from 'gatsby';
import {Form} from "react-bootstrap"
class LoginFormStaff extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const { username, password } = this.state;

    try {
      await this.props.drupalOauthClient.handleLogin(username, password, '');
      this.setState({ processing: false });
      this.props.updateAuthenticatedUserState(true);
        navigate(`${this.props.r}`)
    } catch(err) {
      this.setState({
        processing: false,
        error: 'Unable to complete your login request.',
      });
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
            :
            <form onSubmit={ event => this.handleSubmit(event)}>
              <div className="title-form">
                <h2>login</h2>
              </div>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="Ingresa tú usuario staff" name="username" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" minLength="8" name="password" placeholder="Ingresa tú contraseña" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                { error && <Form.Text>{error} </Form.Text>}
              </Form.Group>
              <Link className="link-text" to="/recover-password">Solicitar nueva contraseña</Link>
              <div className="link button-fifth">
               <input type="submit" value="ingresa" onClick={ event => this.handleSubmit(event)} />
              </div>
              <Link className="link-text" to="/user/register">No tienes cuenta</Link>
            </form>
          }
        </>
    );
  }
}

export default withDrupalOauthConsumer(LoginFormStaff);