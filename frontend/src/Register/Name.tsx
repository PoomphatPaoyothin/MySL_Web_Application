import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";
import Popuploading from "../Loadingpop/PopupLoading";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import UploadProfile from "../Profile/UploadProfile";

const Name = (props:any) =>{
    const history=useHistory()
    const [name,setName] = useState<string>()
    const [surname,setSurname] = useState<string>()
    const [prefix,setprefix] = useState<string>()
    const id = props.match.params.id;
    const [userinfo,setUserinfo] = useState<any>()
    const myid = localStorage.getItem('id');
    const [prefixSelect, setPrefixSelect] = useState<string|undefined>('Mr.')
    const  {promiseInProgress}  = usePromiseTracker()
    

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
        const obj ={
            User_prefix_name:prefixSelect,
            User_name:name,
            User_surname:surname,
        }
        let status = 1
        RegisterService.postname(obj,myid)

        trackPromise(
            RegisterService.createStat(myid)
            .then(res2=>{
                if(res2.UserId!=undefined){
                    alert('สมัครสำเร็จ')
                    history.push('/')
                }
                else{
                    alert('เกิดข้อผิดพลาด')
                }
            })
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
        RegisterService.fetchuserprofile(myid)
        .then(res=>{
            setUserinfo(res)
        })
    },[])

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

                    <button  onClick={gotonext} className="submitname">สมัคร</button>
                </div>
                
                {
                promiseInProgress && 
                <Popuploading/>
                }
            </div>
        }

        </div>
    )
}

export default Name