import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class UpdateUserForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
    uid: false,
  };

  componentDidMount() {
    const token = this.props.drupalOauthClient.isLoggedIn();
    const url = `${process.env.GATSBY_DRUPAL_ROOT}/oauth/debug`;
    const opts = {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `${token.token_type} ${token.access_token}`
      },
    };
    fetch(url, opts)
      .then(res => res.json())
      .then(data =>{
        if(!data.message){
          fetch(`${process.env.GATSBY_DRUPAL_ROOT}/jsonapi/user/user?filter[uid][value]=${data.id}`, opts)
            .then(resp => resp.json())
            .then(userData => {
              const profile = userData.data.shift().id;
              this.setState({
                uid: profile
              })
            }).catch(console.error)
        }else{
          this.props.drupalOauthClient.handleLogout();
          navigate('/user/login')
        }
      })
      .catch(console.error);
  }

  handleChange = async (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const { field_name, field_lastname, birthdate, username, modality, phone, password, new_password } = this.state;

    try {
      await this.props.drupalOauthClient.handleUpdateRegister(field_name, field_lastname, birthdate, username, modality, phone, password, new_password);
      this.setState({ processing: true });
      // this.props.updateAuthenticatedUserState(true);
      navigate("/user/profile");
    } catch(err) {
      this.setState({
        processing: false,
        error: err.message,
      });
    }
  };

  render() {
    const data = this.props.data
    const { processing } = this.state;

    return (
      <>
        <div class="lateral-left">
          <h2 class="text-lateral-update">mis datos</h2>
        </div>
        <div class="container-right">
          <div class="containers-form">
            {processing ?
              <div>Loading ...</div>
              :
              <form onSubmit={event => this.handleSubmit(event)}>
                <div class="container-one">
                  <Form.Group controlId="formBasicText-one">
                    <Form.Control type="text" defaultValue={data.field_name} placeholder="nombres" name="field_name" onChange={this.handleChange}
                     />
                  </Form.Group>
                  <Form.Group controlId="formBasicText-two">
                    <Form.Control type="text" defaultValue={data.field_lastname} placeholder="apellidos" name="field_lastname" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } />
                  </Form.Group>
                  <Form.Group controlId="formBasicDate-one">
                    <Form.Control type="date" defaultValue={data.field_born_date} placeholder="fecha de nacimiento" format="YYYY-MM-DD" name="birthdate" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" defaultValue={data.display_name} placeholder="correo" name="username"
                      onChange={event =>
                        this.setState({ [event.target.name]: event.target.value })
                      } />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control defaultValue={this.value} as="select" name="modality" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    }>
                      <option value="" >MODALIDAD DE CICLISMO</option>
                      <option value="ruta">Ruta</option>
                      <option value="montaña">Montaña</option>
                      <option value="bmx">Bmx</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicDate-two">
                    <Form.Control type="tel" defaultValue={data.field_phone} placeholder="teléfono" name="phone" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } />
                  </Form.Group>
                </div>
                <div class="container-two">
                <h3>Cambio de contraseña</h3>
                  <div class="form">
                    <Form.Group controlId="formBasicPassword-one">
                      <Form.Control type="password" minlength="8" name="password" placeholder="contraseña" onChange={event =>
                        this.setState({ [event.target.name]: event.target.value })
                      } />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword-two">
                      <Form.Control type="password" name="repeat_password" placeholder="repetir contraseña" />
                    </Form.Group>
                  </div>
                </div>
                <div class="link button-fifth">
                  <input type="submit" value="Actualizar" onClick={event => this.handleChange(event)} />
                </div>
              </form>
            }
          </div>
        </div>
      </>
    );

  }
}
export default withDrupalOauthConsumer (UpdateUserForm);
