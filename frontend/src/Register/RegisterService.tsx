import {url} from '../url'

async function postemailpass(obj:any): Promise<any> {
    const res = await fetch(`${url}/register/first/emailpassword`,{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const result = await res.json();
    console.log('otp', result)

    return result

}

async function postotp(id:string|null, obj:any): Promise<any> {
    console.log('otp is', obj)
    const res = await fetch(`${url}/register/${id}/checkotp`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const result = await res.json();
    console.log('result is ', result)
    return result
}

async function postname(obj:any, id:string|null): Promise<any> {
    const res = await fetch(`${url}/register/second/${id}`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    });

    const result = await res.json();
    return result
}

async function fetchuserprofile(id:string): Promise<any>{
    const res = await fetch(`${url}/user/profile/${id}`);
    const obj = await res.json();
    return obj;
}

async function createStat(id:any): Promise<any> {
    const res = await fetch(`${url}/user/${id}/userlessonstat`,{
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
    });
    const result = await res.json();
    return result
}

async function resendOTP(userid:any): Promise<boolean> {
    const res = await fetch(`${url}/register/resendotp/${userid}`,{
        method: 'PATCH',
        headers : {'Content-Type': 'application/json'},
    });
    const tmp = await res.json();
    console.log('tmp ', tmp)

    return tmp
}
export default{
    postemailpass,
    postotp,
    postname,
    fetchuserprofile,
    createStat,
    resendOTP,
}