import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/User/profile"
import Login from "../components/User/login"
import Register from "../components/User/Register"
import Buy from "../components/User/buy"
import PrivateRoute from "../components/Utils/PrivateRoute"
import Thanks from "../components/User/thanks";
import AccountEnable from "../components/User/account-enable";
import RecoveryPassword from "../components/User/recovery-password";
import ChangePassword from "../components/User/change-password";
const App = (props) => {
  return(
    <Layout>
      <Router>
        <PrivateRoute exact path="/user/profile" component={Profile} />
        <PrivateRoute exact path="/user/buy" component={Buy} />
        <PrivateRoute exact path="/user/buy/:id" component={Buy}/>
        <PrivateRoute exact path="/user/thanks/:id" component={Thanks}/>
        <Login exact path="/user/login" />
        <RecoveryPassword exact path = "/user/recovery" />
        <ChangePassword exact path = "/user/recovery/:id/:time/:hash" component={ChangePassword}/>
        <Register exact path="/user/register" component={Register} />
        <AccountEnable exact path="/user/enable/:id" component={AccountEnable} />
        {/* <PrivateRoute path="/user/*" component={Profile} /> */}
      </Router>
    </Layout>
    );

}
export default App
