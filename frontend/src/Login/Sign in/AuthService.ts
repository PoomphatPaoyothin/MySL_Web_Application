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
        localStorage.setItem("accesToken", result.accessToken);
        localStorage.setItem("id", result.userId);
        return result;
    }
    else{
        return false;
    }
}

export default{
    LoginUser,
}