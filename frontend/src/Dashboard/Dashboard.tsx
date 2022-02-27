import React, { useEffect, useState } from "react";
import { Placeholder, Table } from "react-bootstrap";
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
    const [status, setStatus] = useState<boolean>(false)

    useEffect(()=>{
        DashboardService.rankfetch()
        .then(res=>{
            setAlluser(res)
            setStatus(true)
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
                </tr>
            </thead>
            <tbody>
                {
                status &&
                alluser?.map((obj)=>(
                <tr>
                    <td>{obj.rank+1}</td>
                    <td onClick={()=>gotouser(obj.UserID)} className='canclickdash'>{obj.prefix} {obj.username} {obj.surname}</td>
                    <td>{obj.Quiz_stat}</td>
                </tr>

                ))
                }
                {
                !status &&
                <tr>
                    <td>{  <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>}
                    </td>

                    <td >{  <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>}
                    </td>

                    <td>{  <Placeholder as="p" animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>}
                    </td>
                </tr>

                

                }
            </tbody>


            </Table>
        </div>
    )
}

export default Dashboard