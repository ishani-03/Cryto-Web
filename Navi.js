// import React from 'react'
// import {Link} from "react-router-dom";
// //import {Navbar,Nav} from 'react-bootstrap'

// function Nav(){

//     return(
//         <nav>
//             <ul>
//                 <Link to="/entry">
//                 <li>Entry</li>
//                 </Link>
//                 <Link to="/exchange">
//                 <li>Exchange</li>
//                 </Link>
//             </ul>
//         </nav>
        
//     )
// }
// export default Nav;


import React from 'react'
import {Link} from "react-router-dom";
import {Navbar,Nav} from 'react-bootstrap'

function Navi(){

    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="./src/App.js">Crypto-Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/entry">List</Link></Nav.Link>
            <Nav.Link><Link to="/exchange">Exchanges</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        
    );
}
export default Navi;








