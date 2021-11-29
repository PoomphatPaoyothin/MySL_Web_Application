import React from "react";
import { useHistory } from "react-router";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'


const Navigatebar=(prop:any)=>{
    const history = useHistory();
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        // window.location.reload();
    }

    
    return(
        <Navbar bg='myRed' variant='dark'>
            <Navbar.Brand>
                Logo
            </Navbar.Brand>
            {/* <button className='layer2' onClick={logout}>
                logout
            </button>
            <div>
                Home
                lesson
            </div> */}
        </Navbar>
    )
}

export default Navigatebar;