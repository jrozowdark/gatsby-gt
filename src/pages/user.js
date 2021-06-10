import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/User/profile"
import Login from "../components/User/login"
import Register from "../components/User/Register"
import PrivateRoute from "../components/Utils/privateRoute"
const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/user/*" component={Profile} />
      <PrivateRoute path="/user/profile" component={Profile} />
      <Login path="/user/login" />
      <Register path="/user/register" component={Register} />
    </Router>
  </Layout>
)
export default App
