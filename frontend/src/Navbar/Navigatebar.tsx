import React, { useEffect, useState } from "react";
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
import userImage from '../Picture/profile/propic2.png'
import Home from "../Home/Home";
import { Alert, Button, Form, FormControl, InputGroup, NavDropdown } from "react-bootstrap";
import NavigatebarService from "./NavigatebarService";
import Profilepic from "../Profile/Profilepic";
import ProfilepicSmall from "../Profile/ProfilepicSmall";
import Alertshow from "../Profile/Alertshow";

const Navigatebar=(prop:any)=>{
    const history = useHistory();
    const myid = localStorage.getItem('id');
    const [statnavbar, setStatnavbar] = useState<any>({'Quiz_stat':0, 'Lesson_Stat':0})
    const [wordsearch, setWordsearch] = useState<string|undefined>('')
    const [show, setShow] = useState(false)
    const handleClose =()=> setShow(false)
    const [text, setText] = useState('')
    
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
    const Word_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        setWordsearch(e.target.value);
    }
    useEffect(()=>{
        if(myid)
        {
            NavigatebarService.statnavfetch(myid)
            .then(res=>{
                setStatnavbar(res)
            })
        }
    },[myid])
    useEffect(()=>{
        setWordsearch('')
    },[])

    const resetInputField = () => {
        setWordsearch("");
      };
    const search=()=>{
        if(wordsearch)
        {
            NavigatebarService.sendwowrd(wordsearch)
            .then(res=>{    
                if(res == false)
                {
                    setShow(true)
                    setText('ไม่มีคำศัพท์ที่ค้นหา')
                    resetInputField()

                }
                else{
                    history.push(`/lesson/${res.Category_ID}/${wordsearch}`)
                    resetInputField()
                }
            })
        }

    }
    useEffect(()=>{
        if(myid)
        {
            NavigatebarService.statnavfetch(myid)
            .then(res=>{
                setStatnavbar(res)
            })
        }
    },[myid])
    const _handleKeyDown=(e: { key: string; })=> {
        if (e.key === 'Enter') {
            search()
        }
      }

    const gotohome=()=>{
        history.push('/')
    }
    return(
        <Navbar fixed = 'top' className = 'NavBarCSS'>
            <Navbar.Brand href = "/">
                 <Nav.Link eventKey={2} onClick={gotohome} className='Mysllogo'>
                     Mysl
                 </Nav.Link>
                
            </Navbar.Brand>


            <input
            placeholder="ค้นหาคำศัพท์"
            aria-label="Search"
            onChange={Word_input}
            onKeyDown={_handleKeyDown}
            className='searchbox'
            autoComplete="off"
            />
            <Button className="searchbutoon" onClick={search}>ค้นหา</Button>


            <Nav className = "ms-auto">

                <Nav.Link eventKey={2} href="#memes" className='lessonstatnav'>
                    <img src = {LessonIcon2} className = 'lesson-pic'/>
                    <div className="txt">{statnavbar.Lesson_Stat}/15</div>
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes" className='lessonstatnav2'>
                    <img src = {QuizIcon2} className = 'quiz-pic'/>
                    <div className="txt">{statnavbar.Quiz_stat}/45</div>
                </Nav.Link>

                
                <ProfilepicSmall click={linktoprofile} userid={myid}/>
                
                <Button className='dashboardbutton' onClick={showDash}> Dashboard</Button>
                <Button className = 'button-right' onClick={logout}>
                        logout
                </Button>
            </Nav>
            <Alertshow txt={text} show={show} onHide={handleClose} />
        </Navbar>
        
    )
}

export default Navigatebar;

