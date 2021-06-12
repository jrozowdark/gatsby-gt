import * as React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout";
import { Form } from "react-bootstrap"
import { Link } from "gatsby"

const Login = () => (
  <Layout>
    <SEO title="recover-password" />
    <div className="login recover-password">
      <div className="box-form">
        <form>
          <div className="title-form">
            <h2>Recuperar contraseña</h2>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="correo" name="username"
            onChange={event =>
              this.setState({ [event.target.name]: event.target.value })
            }/>
          </Form.Group>
          <div className="link button-first">
            <Link to="/"> enviar </Link>
          </div>
        </form>
      </div>
    </div>
  </Layout>
)

export default Login
