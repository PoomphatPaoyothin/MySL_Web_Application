import {url} from '../url'

async function statnavfetch(userid:string): Promise<any>{
    const res = await fetch(`${url}/user/usernavbarstat/${userid}`);
    const obj = await res.json();
    return obj;
}

export default{
    statnavfetch,
}