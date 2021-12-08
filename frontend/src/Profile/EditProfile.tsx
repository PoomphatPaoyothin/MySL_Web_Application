import React, { useEffect, useState } from "react";
import BoxEditProfile from "./BoxEditProfile";



const EditProfile = (props:any) => {
    const userId = props.match.params.id;
    const myid = localStorage.getItem('id');

    const [ismyid, setIsmyid] = useState<boolean>(false)

    const checkmyid=()=>{
        setIsmyid(userId == myid)
    }

    useEffect(()=>{
        checkmyid()
    },[])

    return(
        <div>
            {ismyid &&
                <BoxEditProfile id={userId}/>
            }

            
        </div>
    )
}

export default EditProfile;