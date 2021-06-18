import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link } from "gatsby";
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class RegisterForm extends React.Component {
  state = {
    processing: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    field_name: '',
    field_nameError: '',
    field_lastname: '',
    field_lastnameError: '',
    modality: '',
    modalityError: '',
    birthdate: '',
    birthdateError: '',
    phone: '',
    phoneError: '',
    error: null,
  };

  validate = () => {
    let usernameError = "";
    let field_nameError = "";
    let field_lastnameError = "";
    let passwordError = "";
    let birthdateError = "";
    let phoneError = "";
    let modalityError = "";

    if (!this.state.username.includes("@", ".")) {
      usernameError = "Correo electronico invalido";
    }
    if (!this.state.field_name) {
      field_nameError = "Campo obligatorio";
    }
    if (!this.state.field_lastname) {
      field_lastnameError = "Campo obligatorio";
    }
    if (!this.state.birthdate ) {
      birthdateError = "Campo obligatorio";
    }
    if (!this.state.modality || this.state.modality == 0) {
      modalityError = "Campo obligatorio";
    }
    console.log(this.state.phone.length)
    if (!this.state.phone || (this.state.phone.length < 7 || this.state.phone.length > 10)) {
      phoneError = "Campo obligatorio";
    }
    if (!this.state.password || this.state.password.length < 8) {
      passwordError = "Campo obligatorio";
    }
    if (usernameError || field_nameError || field_lastnameError || birthdateError || phoneError || passwordError || modalityError) {
      this.setState({usernameError, field_nameError, field_lastnameError, birthdateError, phoneError, modalityError, passwordError});
      return false;
    };
    return true;
   };

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
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
          error: 'Tu usuario ya existe o no tenemos códigos QR para asignarte',
        });
      }
    }
  };
  pad(n){return n<10 ? '0'+n : n}

  render() {
    const { error, processing } = this.state;
    const today = new Date()
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
                <Form.Control
                type="text"
                placeholder="nombres"
                name="field_name"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color:"red"}}>{this.state.field_nameError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicText">
                <Form.Control
                type="text"
                placeholder="apellidos"
                name="field_lastname"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color:"red"}}>{this.state.field_lastnameError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Control
                type="text"
                placeholder="fecha de nacimiento"
                format="DD-MM-YYYY"
                min = '1900-01-01'
                max = {
                  `${today.getFullYear()-18}-${(this.pad(today.getMonth()+1))}-${(this.pad(today.getDate()))}`
                }
                name="birthdate"
                onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color:"red"}}>{this.state.birthdateError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                type="email"
                placeholder="correo"
                name="username"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color: "red"}}>{this.state.usernameError}</div>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                as="select"
                name="modality"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }>
                  <option value="" >MODALIDAD DE CICLISMO</option>
                  <option value="ruta">Ruta</option>
                  <option value ="montaña">Montaña</option>
                  <option value="bmx">Bmx</option>
                  <div style={{color:"red"}}>{this.state.modalityError}</div>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Control
                type="number"
                placeholder="teléfono"
                name="phone"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color:"red"}}>{this.state.phoneError}</div>
              </Form.Group>
              <h3>elige<br/><span>una contraseña</span></h3>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                type="password"
                minlength="8"
                name="password"
                placeholder="contraseña"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div style={{color:"red"}}>{this.state.passwordError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                type="password"
                name="repeat_password"
                 placeholder="repetir contraseña" />
                 <div style={{color:"red"}}>{this.state.passwordError}</div>
              </Form.Group>
              <Link to="user/login"> Ya tienes cuenta?</Link>
              <div className="link button-first">
                <input type="submit" value="Registrate" onClick={ event => this.handleSubmit(event)} />
              </div>
              { error && <Form.Text >{error} </Form.Text>}
            </form>
          }
        </>
      );
    }
  }
}

export default withDrupalOauthConsumer(RegisterForm);
