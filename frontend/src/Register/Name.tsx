import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import RegisterService from "./RegisterService";

const Name = (props:any) =>{
    const history=useHistory()
    const [name,setName] = useState<string>()
    const [surname,setSurname] = useState<string>()
    const [prefix,setprefix] = useState<string>()
    const id = props.match.params.id;
    const [userinfo,setUserinfo] = useState<any>()
    const myid = localStorage.getItem('id');


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
            User_prefix_name:prefix,
            User_name:name,
            User_surname:surname,
        }
        RegisterService.postname(obj,myid)
        .then(res=>{
            if(res.User_name != undefined){
                alert('สมัครสำเร็จ')
                history.push('/')
            }
            else{
                alert('เกิดข้อผิดพลาด')
            }
        })
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
        <div>

        {
            checkid() &&
            <div>
                <input value={prefix} onChange={prefix_input} placeholder="ชื่อจริง" required />
                <input value={name} onChange={name_imput} placeholder="ชื่อจริง" required />
                <input value={surname} onChange={surname_input} placeholder="นามสกุล" required />

                <button  onClick={gotonext}>สมัคร</button>
            </div>
        }

        </div>
    )
}

export default Name