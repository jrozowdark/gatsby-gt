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
            <div className="link-regist">
              <Link to="/user/register">Registrate</Link>
            </div>
            {props.userAuthenticated ?<>
              <div className="link-my-account">
              <Link to="/user/profile"></Link>
              </div>
              <LogoutLink/>
              </> :
              <div className="link-login">
                <Link to="/user/login"></Link>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default withDrupalOauthConsumer(Navigation);
