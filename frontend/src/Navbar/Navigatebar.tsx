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
import { Button, Form, FormControl, InputGroup, NavDropdown } from "react-bootstrap";
import NavigatebarService from "./NavigatebarService";

const Navigatebar=(prop:any)=>{
    const history = useHistory();
    const myid = localStorage.getItem('id');
    const [statnavbar, setStatnavbar] = useState<any>({'Quiz_stat':0, 'Lesson_Stat':0})
    const [wordsearch, setWordsearch] = useState<string|undefined>('')
    
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
                console.log('ssssssssssssssssssss')
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
                console.log('resssss', res)
                if(res == false)
                {
                    alert('ไม่มีคำศัพท์ที่ค้นหา')
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
                console.log('ssssssssssssssssssss')
            })
        }
    },[myid])
    const _handleKeyDown=(e: { key: string; })=> {
        if (e.key === 'Enter') {
            console.log('sssssssssssssssss', wordsearch)
            search()
        }
      }
    return(
        <Navbar fixed = 'top' className = 'NavBarCSS'>
            <Navbar.Brand href = "/">
                <img src = {'https://cdn.discordapp.com/attachments/912175328066142240/946362874777972746/MysL.png'} className = 'home-pic'/>{'  '}MySL
            </Navbar.Brand>

                <InputGroup.Text>
                    <img src={searchIcon} className= 'search-pic'/>
                </InputGroup.Text>
                <input
                placeholder="Dictionary"
                aria-label="Search"
                onChange={Word_input}
                onKeyDown={_handleKeyDown}
                />
                <Button onClick={search}>search</Button>

            <Form> 
                <Button onClick={showDash}> Dashboard</Button>
            </Form>

            <Nav className = "ms-auto">
                {console.log('sssss', statnavbar)}
                <img src = {LessonIcon2} className = 'lesson-pic'/>
                <div className="txt">{statnavbar.Lesson_Stat}/15</div>
                <img src = {QuizIcon2} className = 'quiz-pic'/>
                <div className="txt">{statnavbar.Quiz_stat}/45</div>
                
                <img className = 'user-image' onClick = {linktoprofile} src = {userImage}/>
                
                <Button className = 'button-right' onClick={logout}>
                        logout
                </Button>
            </Nav>
            
        </Navbar>
        
    )
}

export default Navigatebar;

