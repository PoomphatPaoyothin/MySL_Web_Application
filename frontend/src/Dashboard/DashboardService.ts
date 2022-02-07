import {url} from '../url'

async function rankfetch(): Promise<any>{
    const res = await fetch(`${url}/user/dashboard`);
    const obj = await res.json();
    return obj;
}
async function namefetch(): Promise<any>{
    const res = await fetch(`${url}/user/getalluser`);
    const obj = await res.json();
    return obj;
}
export default{
    rankfetch,
    namefetch,
}