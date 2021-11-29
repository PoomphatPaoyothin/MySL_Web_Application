import React, { useEffect, useState } from "react";
import './WordCategory.css';
import image from '../Picture/WordCategory/ExportWordCategory';
import WordIcon from './WordIcon';
import CategoryService from "./CategoryService";
import { wordInfo } from "./InterfaceCategory";
// Animal,
// Appliances,
// Body,
// Clothes,
// Country,
// Dialy,
// Family,
// Food,
// Fruits,
// Occupation,
// Sport,
// Subject,

const WordCategory = () =>{
    const [wordcategory,setWordcategory] = useState<wordInfo[]>()

    const fetchWordCategory=()=>{
        return(
            CategoryService.fetchWordCategory()
            .then(res=>{
                setWordcategory(res);
            })
        )
    }
    useEffect(()=>{
        fetchWordCategory()
        console.log('useffect')
    },[])

    const Isnotundefined=() =>{
        return wordcategory !== undefined;
    }
    console.log()
    return(
        <div className='container'>
            <p className='choosechapter'>
                อยากเรียนบทไหน เลือกเลย
            </p>
            <div className='background'>
                <div className='multimiddle'>
                    
                    {wordcategory?.map((obj)=> ( 
                        <WordIcon name= {obj.Category_name} />
                    ))} 

                    {/* <WordIcon image={image.Dialy} name='ท่าทางในชีวิตประจำวัน'/>
                    <WordIcon image={image.Body} name='ร่างกาย'/>
                    <WordIcon image={image.Family} name='ครอบครัว'/>
                    <WordIcon image={image.Occupation} name='อาชีพ'/>
                    <WordIcon image={image.Appliances} name='เครื่องใช้'/>
                    <WordIcon image={image.Animal} name='สัตว์'/>
                    <WordIcon image={image.Food} name='อาหาร'/>
                    <WordIcon image={image.Fruits} name='ผลไม้'/>
                    <WordIcon image={image.Clothes} name='เสื้อผ้า'/>
                    <WordIcon image={image.Subject} name='วิชา'/>
                    <WordIcon image={image.Country} name='ประเทศ'/>
                    <WordIcon image={image.Sport} name='กีฬา'/> */}
                </div>
            </div>
        </div>
    )
}

export default WordCategory