// import * as React from "react"
import PropTypes from "prop-types"
import React, { useState} from "react"
import styled, { createGlobalstyle } from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './Navigation/Navigation';
import Footer from './footer';

//Importacion imagenes
import LogoGatorade from "../images/logo-menu.png";

const Header = ({ siteTitle }) => {
  const [nav, showNav] = useState(false)

  return (
    <header>
      <div className="menu-gatorade">
        <div className="logo-gatorade">
         <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
        </div>
        <MenuIcon className="menu-icon" nav={nav} onClick={() => showNav(!nav)}>
        <div />
        <div />
        <div />
        </MenuIcon>
        <MenuLinks className="menu-links" nav={nav}>
          <div className="logo-gatorade">
            <img src={LogoGatorade} alt="logo-gatorade" title="gatorade" />
          </div>
          <ul>
            <li>
              <a href="/home">Inicio</a>
            </li>
            <li>
              <a href="/home">Como funciona?</a>
            </li>
            <li>
              <a href="/home">Comprar packs</a>
            </li>
            <li>
              <a href="/home">Mi cuenta</a>
            </li>
            <li>
              <a href="/home">Cuenta de staff</a>
            </li>
          </ul>
          {/* <Footer/> */}
        </MenuLinks>
      </div>
      <Navigation/>
    </header>
  )
}

export default Header

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


const MenuIcon = styled.button `
  div {
    :first-child {
      transform: ${({nav}) => (nav ? "rotate(45deg)": "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({nav}) => (nav ? "0": "1")};
    }

    :nth-child(3) {
      transform: ${({nav}) => (nav ? "rotate(-45deg)": "rotate(0)")};
    }
  }
`
const MenuLinks = styled.div `
  display: ${({nav}) => nav ? "flex": "none"};
`
