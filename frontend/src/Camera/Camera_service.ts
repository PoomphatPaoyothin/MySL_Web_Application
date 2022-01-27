import {url} from '../url'

async function send_video(obj:any): Promise<any> 
{
    const res = await fetch(`${url}/word/upload`,{
        method: 'POST',
        body: obj
    });
    const tmp = await res.json();
    console.log('return is', tmp)
    return tmp
}


export default{
    send_video,
}