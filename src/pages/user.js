import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/User/profile"
import Login from "../components/User/login"
import Register from "../components/User/Register"
import Buy from "../components/User/buy"
import PointSale from "../components/User/point-sale"

import PrivateRoute from "../components/Utils/PrivateRoute"
import PointSaleRedemption from "../components/User/point-sale-redemption";
import LoginPoint from "../components/User/login-point";
import Thanks from "../components/User/thanks";
const App = (props) => {
  return(
    <Layout>
      <Router>
        <PrivateRoute exact path="/user/profile" component={Profile} />
        <PrivateRoute exact path="/user/buy" component={Buy} />
        <PrivateRoute exact path="/user/buy/:id" component={Buy}/>
        <PrivateRoute exact path="/user/thanks/:id" component={Thanks}/>
        <Login exact path="/user/login" />
        <Register exact path="/user/register" component={Register} />
        {/* <PrivateRoute path="/user/*" component={Profile} /> */}
      </Router>
    </Layout>
    );

}
export default App
