import {url} from '../url'

async function send_video(obj:any,randomnum:string): Promise<any> 
{
    const res = await fetch(`http://localhost:8000/upload/${randomnum}`,{
        method: 'POST',
        body: obj
    });
    const tmp = await res.json();
    return tmp
}

async function fetchword(idcat:string|null): Promise<any>{
    const res = await fetch(`${url}/word/wordcat/${idcat}`);
    const obj = await res.json();
    return obj;
}

async function sendstart(obj:any): Promise<any> 
{
    console.log('obj send start: ', obj)
    const res = await fetch('http://localhost:5000/',{
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
    });
    const tmp = await res.json();
    console.log('tmp is ', tmp)
    return tmp
}

export default{
    send_video,
    sendstart,
    fetchword,
}