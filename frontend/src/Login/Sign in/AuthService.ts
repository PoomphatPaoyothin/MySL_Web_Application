import React from 'react';

async function LoginUser(email: string, pass: string): Promise<any>{
    const login_data = {
        User_email:email,
        User_password:pass,
    }
    const res = await fetch('http://localhost:3000/login',{
        method: 'POST',
        // header: {'Content-Type': 'application/json'},
        body: JSON.stringify(login_data),
    });
    console.log('login data is ',login_data)
    const result = await res.json();
    console.log(result);}

export default{
    LoginUser
}