import React, { useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Popuploading from "./PopupLoading";
import testservice from "./testservice";

const Loadingpop = (props:any) =>{
    const { promiseInProgress } = usePromiseTracker();
    const [userinfo,setUserinfo] = useState<any>()
    const LoadingIndicator = () => {
        return (
        <h1>Hey some async call in progress ! </h1>
        );  
    }
    const fetchuserprofile=()=>{

        trackPromise
        (
            testservice.fetchuserprofile('9d230b40-c493-47c5-88b9-5cd7bf3c283f')
            .then(res=>{
                // setUserinfo(res)
            })
        )
    }

    testservice.fetchuserprofile('9d230b40-c493-47c5-88b9-5cd7bf3c283f')
    
    return(
        <div>
            {userinfo}
            <button onClick={fetchuserprofile}> fetch profile </button>

            {
            promiseInProgress && 
            <Popuploading />
            }
            {console.log('promise is',promiseInProgress)}
            
        </div>
    )
}

export default Loadingpop