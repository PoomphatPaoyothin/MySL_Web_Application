import React from "react";
import { useHistory } from "react-router";
import {Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap'

const Navigatebar=(prop:any)=>{
    const history = useHistory();
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        window.location.reload();
    }

    
    return(
        <Navbar bg='myRed' variant='dark'>
            <button className='layer2' onClick={logout}>
                logout
            </button>
            <div>

            </div>
        </Navbar>


    )
}

export default Navigatebar;