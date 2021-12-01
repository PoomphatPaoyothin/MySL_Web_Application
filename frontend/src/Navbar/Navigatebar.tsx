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
import LessonIcon from '../Picture/Navbar/book.png';
import Home from "../Home/Home";

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
                <img src = {HomeIcon} className = 'home-pic'/>{'  '}MySL</Navbar.Brand>
            <Nav.Link href="/lesson">Lesson</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>
            
            <Nav className = "ms-auto">
                <img src = {LessonIcon} className = 'lesson-pic'/>
                <img src = {QuizIcon} className = 'quiz-pic'/>
                <button className = 'button-right' onClick={logout}>
                        logout
                </button>
            </Nav>
        </Navbar>
    )
}

export default Navigatebar;

