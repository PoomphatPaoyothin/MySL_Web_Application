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
    const myid = localStorage.getItem('id');
    
    const logout = () =>{
        localStorage.clear();
        history.push('/');
        window.location.reload();
    }

    const linktoprofile = () =>{
        history.push(`/profile/${myid}`);
    }
    const showDash=()=>{
        history.push('/dashboard')
    }
    
    return(
        <Navbar fixed = 'top' className = 'NavBarCSS'>
            <Navbar.Brand href = "/">
                <img src = {'https://cdn.discordapp.com/attachments/912175328066142240/920238805628387328/MysL.png'} className = 'home-pic'/>{'  '}MySL
            </Navbar.Brand>

            {/* <Form className="d-flex form-search">
                    <InputGroup>
                        <InputGroup.Text>
                            <img src={searchIcon} className= 'search-pic'/>
                        </InputGroup.Text>
                        <FormControl
                        type="search"
                        placeholder="Dictionary"
                        aria-label="Search"
                    />
                </InputGroup>
            </Form> */}

            <Form> 
            {/* <button onClick={showDash}> Dashboard</button> */}
            </Form>

            <Nav className = "ms-auto">

                <img src = {LessonIcon2} className = 'lesson-pic'/>
                <div className="txt">0/10</div>
                <img src = {QuizIcon2} className = 'quiz-pic'/>
                <div className="txt">0/100</div>
                
                <img className = 'user-image' onClick = {linktoprofile} src = {userImage}/>
                
                <button className = 'button-right' onClick={logout}>
                        logout
                </button>
            </Nav>
            
        </Navbar>
        
    )
}

export default Navigatebar;

