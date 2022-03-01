import React from 'react';
import { url } from '../../url';

async function LoginUser(email: string, pass: string): Promise<any>{
    const login_data = {
        User_email:email,
        User_password:pass,
    }  
   

    const res = await fetch(`${url}/login`,{
        method: 'POST',
        headers: new Headers ({'Content-Type': 'application/json'}),
        body: JSON.stringify(login_data),
    });
    
    const result = await res.json();
    if(result.accessToken){
        return result;
    }
    else{
        return false;
    }
}
async function fetchisdelete(id:string|null): Promise<any>{
    // console.log('id is', id)
    const res = await fetch(`${url}/user/profile/${id}`);
    const obj = await res.json();
    return obj.Is_delete;
}
export default{
    LoginUser,
    fetchisdelete,
}