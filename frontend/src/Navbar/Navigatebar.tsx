import React from "react";
import { useHistory } from "react-router";
import {Navbar, Nav, Button, Container } from 'react-bootstrap';
import bootstrap from 'bootstrap';
import './Navigatebar.css';

const Navigatebar=(prop:any)=>{
    const history = useHistory();
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        window.location.reload();
    }

    
    return(
        <Navbar fixed = 'top' className = 'NavBarCSS'>
            <Container className = 'borderless'>
                <Navbar.Brand href = "/">asdf</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Navigatebar;

{/* <button className = 'button-right' onClick={logout}>
                        logout
                    </button> */}