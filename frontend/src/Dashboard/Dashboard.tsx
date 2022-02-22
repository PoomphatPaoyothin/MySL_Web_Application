import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isJSDoc } from "typescript";
import DashboardService from "./DashboardService";
class Foo {
    constructor(public ID: string) {
    }
  }
const Dashboard=(props:any)=>{
    const history=useHistory()
    const id = localStorage.getItem('id')
    const [dataDash,setDataDash] = useState<any[]>([])
    const [alluser, setAlluser] = useState<any[]>([])
    const [rank, setRank] = useState<any[]>([])

    useEffect(()=>{
        DashboardService.namefetch()
        .then(res=>{
            setAlluser(res)
        })
    },[])

    useEffect(()=>{
        if(id != null)
        {
            if(alluser !== [])
            {
                DashboardService.rankfetch()
                .then(
                    res=>{
                        setDataDash(res)
                        let size_i = dataDash.length
                        let size_j = alluser.length
                        let tmp_arr: React.SetStateAction<any[]> = []
                        for(let i=0; i<size_i; i++)
                        {
                            for(let j=0; j<size_j; j++)
                            {
                                if(dataDash[i].UserID == alluser[j].ID)
                                {
                                    let tmp = alluser[j].User_prefix_name + alluser[j].User_name + alluser[j].User_surname
                                    // console.log(tmp, tmp_arr)
                                    if(!(tmp_arr.includes(tmp))){
                                        tmp_arr.push(tmp)
                                    }
                                }
                            }
                        }
                        setRank(tmp_arr)
                    }
                )
            }
        }
    },[alluser])
    console.log('aaaaaaaaaaaa',['a'].includes('a'))
    useEffect(()=>{
        console.log(rank)
    },[rank])

    return(
        <div>
            {rank?.map((obj)=> (<div>{obj}</div>))}
        </div>
    )
}

export default Dashboard