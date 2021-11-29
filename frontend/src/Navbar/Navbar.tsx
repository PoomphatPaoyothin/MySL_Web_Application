import React from "react";
import { useHistory } from "react-router";
import './Navbar.css';
import {Nav, NavDropdown} from 'react-bootstrap'

const Navbar=(prop:any)=>{
    const history = useHistory();
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        // window.location.reload();
    }

    
    return(
        <Navbar>
            <button className='layer2' onClick={logout}>
                logout
            </button>
            <div>
                Home
                lesson
            </div>
        </Navbar>
    )
}

export default Navbar;