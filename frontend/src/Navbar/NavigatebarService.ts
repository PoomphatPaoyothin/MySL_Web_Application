import {url} from '../url'

async function statnavfetch(userid:string): Promise<any>{
    const res = await fetch(`${url}/user/usernavbarstat/${userid}`);
    const obj = await res.json();
    return obj;
}

async function sendwowrd(input:any): Promise<any>{
    const res = await fetch(`${url}/word/getword/${input}`);
    const obj = await res.json();
    return obj;
}

export default{
    statnavfetch,
    sendwowrd,
}