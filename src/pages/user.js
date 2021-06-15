import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/User/profile"
import Login from "../components/User/login"
import Register from "../components/User/Register"
import Buy from "../components/User/buy"

import PrivateRoute from "../components/Utils/PrivateRoute"
const App = (props) => {
  return(
    <Layout>
      <Router>
        <PrivateRoute path="/user/*" component={Profile} />
        <PrivateRoute path="/user/profile" component={Profile} />
        <PrivateRoute path="/user/buy" component={Buy} />
        <PrivateRoute path="/user/buy/:id" component={Buy}/>
        <Login path="/user/login" />
        <Register path="/user/register" component={Register} />
      </Router>
    </Layout>
    );

}
export default App
