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
            {/* <Container> */}
                <Navbar.Brand href = "/">Home</Navbar.Brand>
                <Nav.Link href="/lesson">Lesson</Nav.Link>
                <Nav.Link href="/category">Category</Nav.Link>
                

                <button className = 'button-right' onClick={logout}>
                        logout
                </button> 
            {/* </Container> */}
            
        </Navbar>
    )
}

export default Navigatebar;

