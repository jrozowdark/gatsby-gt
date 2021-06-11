import React, {useState} from "react"
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { navigate } from 'gatsby';
import { Form,Modal, Button } from "react-bootstrap"
const FORM_ID = 'payment-form';
class PurchaseForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    PackGroup : 0,
    quantity : 0,
    error: null,
    uid: false,
    radios: null,
    input: null,
    show: null
  };

  componentDidMount() {
    const data = this.props.data;
    console.log(data.packs);
    const radios = data.packs.nodes.map(node => {
      return {'id' : node.drupal_internal__nid, 'field_lateral_title' : node.field_lateral_title,'field_title' : node.field_title, 'field_quantity_bottles': node.field_quantity_bottles}
    });
    this.setState({"radios" : radios});
    const input = data.products.nodes.map(node => {
      if (!node.field_unique) {
        return {'title' : node.title}
      }
    });
    const filtered = input.filter(function (el) {
      return el !== undefined;
    });
    this.setState({"input" : filtered});
  }

  handleChange = async (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    // const { field_name, field_lastname, birthdate, username, modality, phone, password, new_password } = this.state;
    //  // con el preferenceId en mano, inyectamos el script de mercadoPago
    //  const script = document.createElement('script');
    //  script.type = 'text/javascript';
    //  script.src =
    //    'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
    //  script.setAttribute('data-preference-id', preferenceId);
    //  const form = document.getElementById(FORM_ID);
    //  form.appendChild(script);
    // try {
    //   await this.props.drupalOauthClient.handleUpdateRegister(field_name, field_lastname, birthdate, username, modality, phone, password, new_password);
    //   this.setState({ processing: true });
    //   // this.props.updateAuthenticatedUserState(true);
    //   navigate("/user/profile");
    // } catch(err) {
    //   this.setState({
    //     processing: false,
    //     error: err.message,
    //   });
    // }
  };
     handleClose = () => this.setState({show :false});
     handleShow = () => this.setState({show :true});
  render() {
    if (this.state.radios != null){
      let {PackGroup} = this.state

        return (
          <>
           <form onSubmit={ event => this.handleSubmit(event)}>
           <div className="title-pack">
              <p>elige tu pack</p>
           </div>
           <Form.Group >
            {this.state.radios.map((d, i) => (
              <Form.Label key={i} className={PackGroup == d.id ? 'checked': ''} htmlFor="PackGroupC" onClick={event =>{
                  this.setState({ 'PackGroup': d.id })
                  this.setState({'quantity': d.field_quantity_bottles })
                  }} >
                <div class="text-first">{d.field_lateral_title}</div>
                <div class="text-second">{d.field_title}</div>
              <Form.Check
                key={i}
                value = {d.id}
                type={`radio`}
                name="PackGroup"
                className={PackGroup == d.id ? 'checked': ''}
                quantity={d.field_quantity_bottles}
                onChange={event =>{
                  this.setState({ [event.target.name]: event.target.value })
                  this.setState({'quantity': d.field_quantity_bottles })
                  }
                }
                checked={PackGroup == d.id}
              />
              </Form.Label>
            ))}
            </Form.Group>
            <div className="botellas">
              <p> {this.state.quantity > 0 ? `${this.state.quantity} Botellas` : ''} </p>
            </div>
            <div className="text-data" dangerouslySetInnerHTML={{ __html: this.state.quantity > 0 ? `<div class="elige"><p>elige tu sabor y cantidad</p><p>Puedes escoger hasta ${this.state.quantity} Botellas</p></div>` : ''}} />
            <Form.Group className="select-flavor" controlId="formBasicText">
            {this.state.input.map((d, i) => (
                <Form.Label>{d.title}
                <Form.Control type="number" placeholder="00" name="field_quantity" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                </Form.Label>
            ))}
            </Form.Group>
               <div class="link button-first">
                 <input type="submit" value="Recargar" onClick={ event => this.handleSubmit(event)} />
               </div>
          </form>
                      <Button variant="primary" onClick={this.handleShow}>
              Launch static backdrop modal
            </Button>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form id={FORM_ID} method="GET" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary">Understood</Button>
              </Modal.Footer>
            </Modal>
            </>
        )
      // const data = Object.keys(this.state.radios);
      // const packs = data.map(d => {
      //   console.log(d)
      //   // return (
      //   // <Form.Check
      //   //   custom
      //   //   type={`radio`}
      //   //   id={`custom-${d.id}`}
      //   //   label={`Check this custom ${d.field_title}`}
      //   // />)
      // })
    }else{
      return ('')
    }
    const { processing } = this.state;
    console.log(this.state.radios);
    // return (
    //   <>
    //     <div class="lateral-left">
    //       <h2 class="text-lateral-update">mis datos</h2>
    //     </div>
    //     <div class="container-right">
    //       <div class="containers-form">
    //         {processing ?
    //           <div>Loading ...</div>
    //           :
    //           <form onSubmit={ event => this.handleSubmit(event)}>
    //           {packs}
    //           <Form.Group controlId="formBasicText">
    //             <Form.Control type="text" placeholder="nombres" name="field_name" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicText">
    //             <Form.Control type="text" placeholder="apellidos" name="field_lastname" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicDate">
    //             <Form.Control type="date" placeholder="fecha de nacimiento" format="YYYY-MM-DD" name="birthdate" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicEmail">
    //             <Form.Control type="email" placeholder="correo" name="username"
    //             onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <Form.Group controlId="exampleForm.ControlSelect1">
    //             <Form.Control as="select" name="modality" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }>
    //               <option value="" >MODALIDAD DE CICLISMO</option>
    //               <option value="ruta">Ruta</option>
    //               <option value ="montaña">Montaña</option>
    //               <option value="bmx">Bmx</option>
    //             </Form.Control>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicDate">
    //             <Form.Control type="tel" placeholder="teléfono" name="phone" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <h3>elige<br/><span>una contraseña</span></h3>
    //           <Form.Group controlId="formBasicPassword">
    //             <Form.Control type="password" minlength="8" name="password" placeholder="contraseña" onChange={event =>
    //               this.setState({ [event.target.name]: event.target.value })
    //             }/>
    //           </Form.Group>
    //           <Form.Group controlId="formBasicPassword">
    //             <Form.Control type="password" name="repeat_password" placeholder="repetir contraseña" />
    //           </Form.Group>
    //           {/* <Link to="/login"> Ya tienes cuenta?</Link> */}
    //           <div class="link button-second">
    //             <input type="submit" value="Registrate" onClick={ event => this.handleSubmit(event)} />
    //           </div>
    //         </form>
    //         }
    //       </div>
    //     </div>
    //   </>
    // );

  }
}
export default withDrupalOauthConsumer (PurchaseForm);
