import {url} from '../url'

async function fetchuserprofile(id:string|null): Promise<any>{
    const res = await fetch(`${url}/user/profile/${id}`);
    const obj = await res.json();
    return obj;
}

export default{
    fetchuserprofile,
}