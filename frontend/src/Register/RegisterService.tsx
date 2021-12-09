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
    console.log('id is', id)
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
    console.log('name is', result)
    return result
}

async function fetchuserprofile(id:string|null): Promise<any>{
    const res = await fetch(`${url}/user/profile/${id}`);
    const obj = await res.json();
    return obj;
}

export default{
    postemailpass,
    postotp,
    postname,
    fetchuserprofile,
}