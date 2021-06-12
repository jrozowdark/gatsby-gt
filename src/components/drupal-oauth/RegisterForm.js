import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link } from "gatsby";
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class RegisterForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const { field_name, field_lastname, birthdate, username, modality, phone, password } = this.state;

    try {
      await this.props.drupalOauthClient.handleRegister(field_name, field_lastname, birthdate, username, modality, phone, password, 'cliente');
      this.setState({ processing: false });
      this.props.updateAuthenticatedUserState(true);
      navigate("/regist-full");
    } catch(err) {
      this.setState({
        processing: false,
        error: err.message,
      });
    }
  };

  render() {
    const { processing } = this.state;
    if (this.props.userAuthenticated){
      navigate("/user/profile");
      return('');
    }else{
      return (
        <>
          { processing ?
            <div>Loading ...</div>
            :
            <form onSubmit={ event => this.handleSubmit(event)}>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="nombres" name="field_name" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="apellidos" name="field_lastname" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Control type="text" placeholder="fecha de nacimiento" format="DD-MM-YYYY" name="birthdate"   onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="correo" name="username"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select" name="modality" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }>
                  <option value="" >MODALIDAD DE CICLISMO</option>
                  <option value="ruta">Ruta</option>
                  <option value ="montaña">Montaña</option>
                  <option value="bmx">Bmx</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Control type="tel" placeholder="teléfono" name="phone" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <h3>elige<br/><span>una contraseña</span></h3>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" minlength="8" name="password" placeholder="contraseña" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="repeat_password" placeholder="repetir contraseña" />
              </Form.Group>
              <Link to="/login"> Ya tienes cuenta?</Link>
              <div className="link button-first">
                <input type="submit" value="Registrate" onClick={ event => this.handleSubmit(event)} />
              </div>
            </form>
          }
        </>
      );
    }
  }
}

export default withDrupalOauthConsumer(RegisterForm);
