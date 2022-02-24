import {url} from '../url'

async function patchemail(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/register/forgotpass`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const tmp = await res.json();
    console.log('forgotpasssssssssssssssss', tmp)


    return tmp
}



async function checkotp(obj:any): Promise<any> {
    console.log('obj is', obj)
    const res = await fetch(`${url}/register/checkOTPwithemail`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const tmp = await res.json();
    console.log('res forget2 is',tmp)
    return tmp
}

async function changepassword(obj:any): Promise<boolean> {
    const res = await fetch(`${url}/register/changeforgotpass`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const tmp = await res.json();

    return tmp
}

export default{
    patchemail,
    checkotp,
    changepassword,
}