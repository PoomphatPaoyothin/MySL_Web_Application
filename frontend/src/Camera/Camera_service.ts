import {url} from '../url'

async function send_video(obj:any): Promise<any> 
{
    const res = await fetch(`${url}/word/upload`,{
        method: 'POST',
        body: obj
    });
    const tmp = await res.json();
    return tmp
}

async function sendstart(obj:any): Promise<any> 
{
    // const res = await fetch('http://localhost:5000',{
    //     method: 'POST',
    //     body: obj
    // });
    // const tmp = await res.json();
    // return tmp
}

export default{
    send_video,
    sendstart,
}