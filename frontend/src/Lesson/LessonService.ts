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
// async function patchPasword(obj:any, id:string): Promise<any> {
//     const res = await fetch(`${url}/user/${id}/setting/password`,{
//         method: 'PATCH',
//         headers : {'Content-Type': 'application/json'},
//         body: JSON.stringify(obj),
//     });

//     const patchPassword = await res.json();

//     if(patchPassword !== undefined)
//     {
//         alert('รหัสผ่านเปลี่ยนเรียบร้อยแล้ว')
//     }
//     else{
//         alert('ผิดพลาด')
//     }
//     window.location.reload();
// }


export default{
    fetchlesson,
    fetchword,
    fetchwordCat,
    // patchPasword,
}