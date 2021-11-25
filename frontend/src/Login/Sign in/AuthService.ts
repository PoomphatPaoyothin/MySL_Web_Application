import React from 'react';

async function LoginUser(email: string, pass: string): Promise<any>{
    const login_data = {
        User_email:email,
        User_password:pass,
    }
    console.log('real data is ',JSON.stringify(login_data))

    const res = await fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: new Headers ({'Content-Type': 'application/json'}),
        body: JSON.stringify(login_data),
    });
    
    const result = await res.json();
    console.log(result);}

export default{
    LoginUser
}