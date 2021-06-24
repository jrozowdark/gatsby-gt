import React, { useState} from 'react';
import { Link, navigate } from 'gatsby';
import withDrupalOauthConsumer from '../drupal-oauth/withDrupalOauthConsumer';
import styled, { createGlobalstyle } from "styled-components";
import LogoutLink from '../LogoutLink/LogoutLink';
import LogoGatorade from "../../images/logo-menu.png";

function NavigationMobile(props) {
  const [nav, showNav] = useState(false)
  return (
  <ul>
    <li>
      <a href="/">Inicio</a>
    </li>
    <li>
      <a href="/#secundary-slider"  onClick={() => showNav(!nav)}>Cómo funciona?</a>
    </li>
    <li>
      <a href="/#buy-packs"  onClick={() => showNav(!nav)}>Comprar packs</a>
    </li>
    {props.userAuthenticated ?<>
      <li>
        <a href="/user/profile"  onClick={() => showNav(!nav)}>Mi cuenta</a>
      </li>
      <li>
        <a
        href="#"
        onClick={async () => {
          await props.drupalOauthClient.handleLogout();
          props.updateAuthenticatedUserState(false);
          navigate('/')
        }}
      >
      Cerrar Sesión
      </a>
      </li>
    </>:<>
      <li>
        <a href="/user/login"  onClick={() => showNav(!nav)}>Mi cuenta</a>
      </li>
      <li>
        <a href="/staff/login" onClick={() => showNav(!nav)}>Cuenta de staff</a>
      </li>

    </>}
  </ul>

  );
}

export default withDrupalOauthConsumer(NavigationMobile);

const Modal= styled.div `
  display: ${({nav}) => nav ? "flex": "none"};
`
