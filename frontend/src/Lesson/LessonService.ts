import {url} from '../url'


async function fetchlesson(idcat:string|null): Promise<any>{
    const res = await fetch(`${url}/word/lesson/${idcat}`);
    const obj = await res.json();
    return obj;
}

async function fetchword(idcat:string|null): Promise<any>{
    const res = await fetch(`${url}/word/wordcat/${idcat}`);
    const obj = await res.json();
    // console.log(obj)
    return obj;
}

async function fetchwordCat(): Promise<any>{
    const res = await fetch(`${url}/word/category`);
    const word = await res.json();
    return word;
}

async function fetchflask(): Promise<any>{
    const res = await fetch('http://localhost:5000/');
    const obj = await res.json();
    return obj;
}


async function sendfile(obj:any): Promise<any> {
    for (var pair of obj.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch(`http://localhost:5000/`,{
        method: 'POST',
        body: obj,
    });
    const result= await res.json();
    console.log('result is', result)
    return result
}

async function sendans(obj:any): Promise<any> {
    for (var pair of obj.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch(`http://localhost:5000/`,{
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: obj,
    });
    const result= await res.json();
    console.log('result is', result)
    return result
}

async function fetchlessonstat(id:string): Promise<any>{
    const res = await fetch(`${url}/user/profile/lessonstat/${id}`);
    const obj = await res.json();
    console.log('stat is', obj)
    return obj;
}
async function plusint(obj:any): Promise<any> 
{
    const res = await fetch('http://localhost:5000/test',{
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
    });
    const tmp = await res.json();
    return tmp
}


async function sendscore(obj:any, userid:string): Promise<any> 
{
    const res = await fetch(`${url}/user/${userid}/updatelessonstat`,{
        method: 'PATCH',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify(obj)
    });
    const tmp = await res.json();
    return tmp
}

async function isquizscore(userid:string, catid:string, lessonid:string): Promise<any>{
    const res = await fetch(`${url}/user/isquizandscore/${userid}/${catid}/${lessonid}`)
    const tmp = await res.json();

    return tmp;
}

async function fetchlinkvideo(wordnow:string): Promise<any>{
    const res = await fetch(`${url}/word/getword/${wordnow}`);
    const obj = await res.json();
    return obj;
}

export default{
    fetchlesson,
    fetchword,
    fetchwordCat,
    fetchflask,
    sendfile,
    sendans,
    fetchlessonstat,
    plusint,
    sendscore,
    isquizscore,
    fetchlinkvideo,
}