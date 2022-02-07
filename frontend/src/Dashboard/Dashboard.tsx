import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardService from "./DashboardService";

const Dashboard=(props:any)=>{
    const history=useHistory()
    const id = localStorage.getItem('id')
    const [dataDash,setDataDash] = useState<any[]>([])
    useEffect(()=>{
        if(id != null)
        {
            DashboardService.rankfetch()
            .then(
                res=>{
                    setDataDash(res)
                }
            )
        }
    },[])

    return(
        <div>
            {dataDash?.map((obj)=> (<div>{obj.UserID}</div>))}
        </div>
    )
}

export default Dashboard