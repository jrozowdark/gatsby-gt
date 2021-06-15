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
    show: null,
  };

  componentDidMount() {
    const data = this.props.data;
    if (this.props.pid != 0){
      this.setState({PackGroup :this.props.pid});
    }
    const radios = data.packs.nodes.map(node => {
      return {'id' : node.drupal_internal__nid, 'field_lateral_title' : node.field_lateral_title,'field_title' : node.field_title, 'field_quantity_bottles': node.field_quantity_bottles}
    });
    this.setState({"radios" : radios});
    const input = data.products.nodes.map(node => {
      if (!node.field_unique) {
        return {'title' : node.title, 'pid': node.drupal_internal__nid}

      }
    });
    const filtered = input.filter(function (el) {
      return el !== undefined;
    });
    this.setState({"input" : filtered});
    for (var i = 0; i < filtered.length; i++) {
      this.setState({[`field_quantity_${i}`] : 0})
      this.setState({[`field_quantity_${i}_pid`] : filtered[i].pid})
    }
  }

  handleChange = async (event,pid) => {
    this.setState({value: event.target.value});
    this.setState({ [event.target.name]: event.target.value })
    this.setState({ [`${event.target.name}_pid`]: pid })
    if (event.target.name.includes('field_quantity_') && event.target.value % 12 !== 0) {
      console.log('contain set error', this.state.input)
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
      let sum = 0;
      var items = [];
      for (var i = 0; i < this.state.input.length; i++) {
        sum = sum + parseInt(this.state[`field_quantity_${i}`]);
        items.push({[this.state[`field_quantity_${i}_pid`]] : this.state[`field_quantity_${i}`]});
      }
      if (sum > parseInt(this.state.quantity)) {
        console.log('max updated set Error')
      }else{
        let dataSend = JSON.stringify({'idp':this.state.PackGroup,'products':items,total:sum});
        try {
          const response = await this.props.drupalOauthClient.handleSendOrder(dataSend).then(data => {
            navigate(data)
          });
          this.setState({
            processing: true
          });
        } catch (err) {
          this.setState({
            processing: false,
            error: err.message,
          });
        }
      }
    // const { field_name, field_lastname, birthdate, username, modality, phone, password, new_password } = this.state;
    //  // con el preferenceId en mano, inyectamos el script de mercadoPago
    //  const script = document.createElement('script');
    //  script.type = 'text/javascript';
    //  script.src =
    //    'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
    //  script.setAttribute('data-preference-id', preferenceId);
    //  const form = document.getElementById(FORM_ID);
    //  form.appendChild(script);

  };
     handleClose = () => this.setState({show :false});
     handleShow = () => this.setState({show :true});
  render() {
    if (this.state.radios != null){
      let {PackGroup} = this.state
      let quantity = 0;
        return (
          <>
           <form onSubmit={ event => this.handleSubmit(event)}>
           <div className="title-pack">
              <p>elige tu pack</p>
           </div>
           <Form.Group className="select-button">
            {this.state.radios.map((d, i) => {
              if (parseInt(this.state.PackGroup) != 0 && d.id == parseInt(this.state.PackGroup)) {
                  this.state.quantity = d.field_quantity_bottles;
              }
              if (PackGroup == 0) {
                this.setState({
                  PackGroup: parseInt(d.id)
                });
                PackGroup = d.id;
              }
              return (
              <Form.Label key={i} className={PackGroup == d.id ? 'checked': ''} htmlFor="PackGroupC" onClick={event =>{
                  this.setState({ 'PackGroup': d.id })
                  this.setState({'quantity': d.field_quantity_bottles })
                  }} >
                <div className="text-first">{d.field_lateral_title}</div>
                <div className="text-second">{d.field_title}</div>
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
              )
            })}
            </Form.Group>
            <div className="botellas">
              <p> {this.state.quantity > 0 ? `${this.state.quantity} Botellas` : ''} </p>
            </div>
            <div className="text-data" dangerouslySetInnerHTML={{ __html: this.state.quantity > 0 ? `<div class="elige"><p>elige tu sabor y cantidad</p><p>Puedes escoger hasta ${this.state.quantity} Botellas</p></div>` : ''}} />
            <Form.Group className="select-flavor" controlId="formBasicText">
            {this.state.input.map((d, i) => (
                <Form.Label key={`pid_${i}`} >{d.title}
                <Form.Control type="number" min="0"  step="12" placeholder="00" pid={d.pid} name={`field_quantity_${i}`} onChange={event => this.handleChange(event,d.pid)}/>
                </Form.Label>
            ))}
            </Form.Group>
               <div className="link button-first">
                 <input type="submit" value="Recargar" onClick={ event => this.handleSubmit(event)} />
               </div>
          </form>
            </>
        )
    }else{
      return ('')
    }
    const { processing } = this.state;

  }
}
export default withDrupalOauthConsumer (PurchaseForm);
