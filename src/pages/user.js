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
const App = (props) => {
  return(
    <Layout>
      <Router>
        <PrivateRoute path="/user/*" component={Profile} />
        <PrivateRoute path="/user/profile" component={Profile} />
        <PrivateRoute path="/user/buy" component={Buy} />
        <PrivateRoute path="/user/buy/:id" component={Buy}/>
        <Login path="/user/login" />
        <LoginPoint path="/user/login/point" />

        <Register path="/user/register" component={Register} />
        <PrivateRoute path="/user/zone" component={PointSale} />
        <PrivateRoute path="/user/zone/redemption" component={PointSaleRedemption} />
      </Router>
    </Layout>
    );

}
export default App
