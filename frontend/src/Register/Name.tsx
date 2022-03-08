import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";
import Popuploading from "../Loadingpop/PopupLoading";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import UploadProfile from "../Profile/UploadProfile";
import { Button } from "react-bootstrap";
import Alertshow from "../Profile/Alertshow";

const Name = (props:any) =>{
    const history=useHistory()
    const [name,setName] = useState<string>()
    const [surname,setSurname] = useState<string>()
    const [prefix,setprefix] = useState<string>()
    const id = props.match.params.id;
    const [userinfo,setUserinfo] = useState<any>()
    const myid =localStorage.getItem('id')
    const [myid2,setMyid2] = useState<any>();
    const [prefixSelect, setPrefixSelect] = useState<string|undefined>('Mr.')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [text, setText] = useState('')
    const [show_alert, setShow_alert] = useState(false)
    const handleClose_alert = () => setShow_alert(false);

    const prefixSelectOption = [{name:'None', value:''},{name:'Mr.', value:'Mr.'}, {name:'Ms.', value:'Ms.'},{name:'Mrs.', value:'Mrs.'}]

    const prefix_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setprefix(e.target.value);
    }
    const name_imput=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
      }
    const surname_input=(e:React.ChangeEvent<HTMLInputElement>) =>{
        setSurname(e.target.value);
    }
    
    const gotonext=()=>{
        setShow(true)
        const obj ={
            User_prefix_name:prefixSelect,
            User_name:name,
            User_surname:surname,
        }
        let status = 1
        RegisterService.postname(obj,myid)
        RegisterService.createStat(myid)
            .then(res2=>{
                setShow(false)
                if(res2.UserId!=undefined){
                    setShow_alert(true)
                    alert('สมัครสำเร็จ')
                    history.push('/')
                }
                else{
                    setText('เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง..')
                    setShow_alert(true)
                }
            }
        )
        
        
    }
    const checkid=()=>{
        if(userinfo != undefined)
        {
        return id == myid && userinfo.register_stat==2
        }   
    }

    useEffect(()=>{
        if(userinfo != undefined)
        {
            if(userinfo.register_stat == 1)
            {
                history.push(`/register/2/${myid}`)
            }
            else if(userinfo.register_stat == 3)
            {
                history.push(`/`)
            }
        }

    },[userinfo])

    useEffect(()=>{
        checkid()
    },[userinfo])

    useEffect(()=>{
        setMyid2(localStorage.getItem('id'))
    },[])

    useEffect(()=>{
        if(myid2)
        {
            RegisterService.fetchuserprofile(myid2)
            .then(res=>{
                setUserinfo(res)
            })
        }
    },[myid2])

    return(
        <div className="container">

        {
            checkid() &&
            <div >
                <div className="nameuploadpos">
                    <p className="nametext">กรุณากรอกชื่อและนามสกุล</p> 
                    <div className="uploadpos">
                        <UploadProfile userid = {myid}/>
                    </div>
                </div>
                
                <div className="inputcenter1">
                    <div className="selectprefix">
                        <form action="#">
                            <select 
                                onChange={((e)=> {setPrefixSelect(e.target.value)})}
                                value={prefixSelect} className="prefix">
                                {prefixSelectOption.map(item=>(
                                    <option value={item.value}>{item.name}</option>
                                ))}
                                
                            </select>
                        </form>
                    </div>
                    <input value={name} onChange={name_imput} className="inputname" placeholder="ชื่อจริง" required /><br/>
                    <input value={surname} onChange={surname_input} className="inputsurname" placeholder="นามสกุล" required /> 

                    <br/>

                    <Button  onClick={gotonext} className="submitname">สมัคร</Button>
                </div>
                
                <Popuploading show = {show} setshow={handleClose}/>
                <Alertshow txt={text} show={show_alert} onHide={handleClose_alert}/>

            </div>
        }

        </div>
    )
}

export default Name