import React, {useState} from "react"
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { navigate } from 'gatsby';
import { Form,Modal, Button } from "react-bootstrap"
const FORM_ID = 'payment-form';
class RedemptionForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    PackGroup : 0,
    quantity : 0,
    error: '',
    uid: false,
    radios: null,
    input: null,
    show: null,
    field_name: null
  };

  componentDidMount() {
    const data = this.props.data;
    // if (this.props.pid != 0){
    //   this.setState({PackGroup :this.props.pid});
    // }
    // const radios = data.packs.nodes.map(node => {
    //   return {'id' : node.drupal_internal__nid, 'field_lateral_title' : node.field_lateral_title,'field_title' : node.field_title, 'field_quantity_bottles': node.field_quantity_bottles}
    // });
    // this.setState({"radios" : radios});
    const input = data.products.nodes.map(node => {
      if (!node.field_unique) {
        return {'title' : node.title, 'id': node.drupal_internal__nid}

      }
    });
    const filtered = input.filter(function (el) {
      return el !== undefined;
    });
    this.setState({"input" : filtered});
    this.setState({field_name: this.props.redem})
    // for (var i = 0; i < filtered.length; i++) {
    //   this.setState({[`field_quantity_${i}`] : 0})
    //   this.setState({[`field_quantity_${i}_pid`] : filtered[i].pid})
    // }
  }

  handleChange = async (event,pid) => {
    this.setState({value: event.target.value});
    this.setState({ [event.target.name]: event.target.value })
    this.setState({ [`${event.target.name}_pid`]: pid })
    if (event.target.name.includes('field_quantity_') && event.target.value % 12 !== 0) {
      this.setState({
        processing: false,
        error: 'La cantidad de botellas debe ser multiplo de 12',
      });
    }else{
      this.setState({
        processing: false,
        error: '',
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(this.props.redem)
    const {PackGroup, field_name} = this.state;
    let dataSend = JSON.stringify({"code": this.props.redem, "idp": PackGroup, "total": 1});
    console.log(dataSend);
    try {
      const response = await this.props.drupalOauthClient.handleSendRedemption(dataSend).then(data => {
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
  };
     handleClose = () => this.setState({show :false});
     handleShow = () => this.setState({show :true});
  render() {
    const { error, input } = this.state;
    // if (this.state.radios != null){
      let {PackGroup} = this.state
      let quantity = 0;
      console.log(input)
      if(input){
        return (
          <>
          <div className="box-zone">
            <form onSubmit={ event => this.handleSubmit(event)}>
              <h2>zona de <span>redención</span></h2>
              <p>"Por favor selecciona el sabor dentro de los productos que tienes disponible"</p>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="Id usuario" name="field_name" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                } value={this.props.redem} readOnly/>
              </Form.Group>
              <Form.Group className="select-button">
              {input.map((d, i) => {
                if (PackGroup == 0) {
                  this.setState({
                    PackGroup: parseInt(d.id)
                  });
                  PackGroup = d.id;
                }
                return (
                <Form.Label key={i} className={PackGroup == d.id ? 'checked': ''} htmlFor="PackGroupC" onClick={event =>{
                    this.setState({ 'PackGroup': d.id })
                    }} >
                  <div className="text-first">{d.title}</div>
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
              <div className="link button-first">
                <input type="submit" value="Reclamar" onClick={ event => this.handleSubmit(event)} />
              </div>
            </form>
          </div>
            </>
        )
    }else{
      return ('')
    }
    const { processing } = this.state;

  }
}
export default withDrupalOauthConsumer (RedemptionForm);
