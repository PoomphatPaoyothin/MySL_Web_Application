import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { isJSDoc } from "typescript";
import DashboardService from "./DashboardService";
import './Dashboard.css'
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
        DashboardService.rankfetch()
        .then(res=>{
            setAlluser(res)
            console.log('all user is', res)
        })
    },[])

    const gotouser=(userid:string)=>{
        history.push(`/profile/${userid}`)
    }
    return(
        <div>

            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>อันดับ</th>
                    <th>รายชื่อ</th>
                    <th>คะแนน</th>
                    <th>จำนวนคนติดตาม</th>
                    <th>จำนวนคนกำลังติดตาม</th>
                </tr>
            </thead>
            <tbody>
                {alluser?.map((obj)=>(
                <tr>
                    <td>{obj.rank+1}</td>
                    <td onClick={()=>gotouser(obj.ID)} className='canclickdash'>{obj.prefix} {obj.username} {obj.surname}</td>
                    <td>{obj.Quiz_stat}</td>
                    <td>{obj.followeramount}</td>
                    <td>{obj.followingamount}</td>
                </tr>

                ))}
            </tbody>


            </Table>
        </div>
    )
}

export default Dashboard