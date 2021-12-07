import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { useHistory } from "react-router";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import bootstrap from 'bootstrap';
import './Navigatebar.css';
import { Link } from "react-router-dom";
import HomeIcon from '../Picture/Login/logo.png';
import QuizIcon from '../Picture/Navbar/kisspng-computer-icons-iconfinder-question-quiz-icon-question-answer-photos-5ab126dc3d46f9.169194981521559260251.png';
import QuizIcon2 from '../Picture/Navbar/output-onlinepngtools (1).png'
import LessonIcon from '../Picture/Navbar/book.png';
import LessonIcon2 from '../Picture/Navbar/output-onlinepngtools.png'
import searchIcon from '../Picture/Navbar/search-icon-png-9982.png'
import userImage from '../Picture/profile/Profile.png'
import Home from "../Home/Home";
import { Form, FormControl, InputGroup, NavDropdown } from "react-bootstrap";

const Navigatebar=(prop:any)=>{
    const history = useHistory();
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        window.location.reload();
    }

    
    return(
        <Navbar fixed = 'top' className = 'NavBarCSS'>
            <Navbar.Brand href = "/">
                <img src = {HomeIcon} className = 'home-pic'/>{'  '}MySL
            </Navbar.Brand>
            <Nav.Link href="/lesson">Lesson</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>
            
            
            <Nav className = "ms-auto">
                <Form className="d-flex form-search">
                    <InputGroup>
                        <InputGroup.Text>
                            <img src={searchIcon} className= 'search-pic'/>
                        </InputGroup.Text>
                        <FormControl
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    </InputGroup>
                    
                </Form>
                <img src = {LessonIcon2} className = 'lesson-pic'/>
                <div className="txt">0/10</div>
                <img src = {QuizIcon2} className = 'quiz-pic'/>
                <div className="txt">0/100</div>
                <NavDropdown className = 'dropdown-right'
                    title={
                        <img className = 'user-image' src = {userImage}/>
                }>
                <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>


                </NavDropdown>
                {/* <button className = 'button-right' onClick={logout}>
                        logout
                </button> */}
            </Nav>
            
        </Navbar>
        
    )
}

export default Navigatebar;

