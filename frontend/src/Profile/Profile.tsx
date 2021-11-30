import React from "react";
import Follow from "./Follow";
import './Profile.css';
import Stat from "./Stat";
import Above from "./Above";



const Profile=()=>{
    return(
        <div className='container'>
            <Above />
            <Stat />
            <Follow />
        </div>
    )
}

export default Profile