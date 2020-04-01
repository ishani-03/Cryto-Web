import React from 'react'
import {Route,Link} from "react-router-dom";
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'

function NavBar(){

    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="./src/App.js">Crypto-Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/entry">Display List</Link></Nav.Link>
            <Nav.Link><Link to="/exchange">Exchanges</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        
    );
}
export default NavBar;




