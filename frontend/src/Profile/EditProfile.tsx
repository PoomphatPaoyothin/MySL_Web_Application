import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterService from "../Register/RegisterService";
import BoxEditProfile from "./BoxEditProfile";



const EditProfile = (props:any) => {
    const history=useHistory()
    const userId = props.match.params.id;
    const myid = localStorage.getItem('id');
    const [userinfo,setUserinfo] = useState<any>()
    const [myid2,setMyid2] = useState<any>();

    const [ismyid, setIsmyid] = useState<boolean>(false)

    const checkmyid=()=>{
        setIsmyid(userId == myid)
    }

    useEffect(()=>{
        checkmyid()
    },[])

    ///////////////////////////////////////////////////////////////////////////////////
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


    useEffect(()=>{
        if(userinfo !=undefined)
        {
            if(userinfo.register_stat == 1)
            {
                history.push(`/register/2/${myid}`)
            }
            else if(userinfo.register_stat == 2)
            {
                history.push(`/register/3/${myid}`)
            }
            // else if(userinfo.register_stat == 3)
            // {
            //     history.push(`/`)
            // }
        }

    },[userinfo])


///////////////////////////////////////////////////////////////////////////////////

    return(
        <div className='containerEditall'>
            {ismyid &&
                <BoxEditProfile id={userId}/>
            }

        </div>
    )
}

export default EditProfile;