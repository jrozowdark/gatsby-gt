import React from 'react';
import { Link } from 'gatsby';
import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';

import LogoutLink from '../LogoutLink/LogoutLink';
import LogoGatorade from "../../images/logo-menu.png";

function Navigation(props) {
  return (
    <div className="menu-horizontal container-fluid" >
      <div className="row">
        <div className="col-12 navbar">
          <div className="logo-navbar">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
            </Link>
            <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
          </div>
          <div className="links-section">
            {props.userAuthenticated ?<>
              <div className="link-my-account">
              <Link to="/user/profile"></Link>
              </div>
              <LogoutLink/>
              </> :<>
              <div className="link-regist">
                <Link to="/user/register">Registrate</Link>
              </div>              
              <div className="link-login" onClick>
                <Link to="#"></Link>
              </div></>
            }
            <div className="modal-menu">
               <p>Ingresar como:</p>
               <Link to="/user/login">Deportista</Link>
               <Link to="/user/login">staf</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withDrupalOauthConsumer(Navigation);
