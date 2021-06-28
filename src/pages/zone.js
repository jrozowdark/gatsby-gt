import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../sass/base/_fonts.scss"
import { Form } from "react-bootstrap"

const IndexPage = ({code}) => {
  return(
  <Layout>
    <SEO title="zone" />
    <div className="zone container-fluid">
      <div className="row">
        <div className="box-zone">
          <h2>zona de <span>redención</span></h2>
          <p>"Por favor selecciona la cantidad de producto y el sabor"</p>
          <Form.Group controlId="formBasicText">
            <Form.Control type="text" placeholder="Id usuario" name="field_name" onChange={event =>
              this.setState({ [event.target.name]: event.target.value })
            }/>
          </Form.Group>
          <Form.Check
            type="radio"
            label="New York"
            name="group2"
            id="radio2"
          />
          <Form.Check
            type="radio"
            label="New York"
            name="group2"
            id="radio2"
          />
          <Form.Check
            type="radio"
            label="New York"
            name="group2"
            id="radio2"
          />
          <div className="link button-first">
            <Link to="/"> redimir </Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
}

export default IndexPage
