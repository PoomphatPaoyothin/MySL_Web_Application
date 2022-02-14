import React, { useEffect, useState } from "react";
import { wordInfo } from "./InterfaceProfile";
import './Profile.css';
import ProfileService from "./ProfileService";
import MyChart from "./donut";

import { Pie,Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);


const Statbox=(props:any)=>{
    return(
        <div className='statboxBG'>
            <div className='wordallPos'>
                <div className='namecategory'>
                    {props.name}
                </div>
                <br/>
                <div className='lessonword'>
                    {/* lesson-- {(props.Lesson_learned/props.Lesson_amount)*100}% */}
                    <div>
                        <Doughnut
                            data={{
                            labels: [
                                'Red',
                                'Bdlue',
                                ],
                            datasets: [
                                {
                                label: 'My First Dataset',
                                data: [80,20],
                                backgroundColor: [
                                    'rgba(190,174,226, 0.8)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                borderWidth: 1,
                                hoverOffset:4,
                                },
                            ],
                            }}
                            height={180}
                            width={180}
                            options={
                                
                                { maintainAspectRatio: false,
                                responsive:true}
                            }
                            
                            
                        />
                    </div>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='lessonquiz'>
                    {/* quiz-- {(props.category_quiz_score/10)*100}% */}
                    <div>
                        <Doughnut
                            data={{
                            datasets: [
                                {
                                data: [30,70],
                                backgroundColor: [
                                    'rgba(94,251,223, 0.8)',
                                    'rgba(155,148,148, 0.2)',
                                ],
                                borderWidth: 1,
                                hoverOffset:3,
                                },
                            ],
                            }}
                            height={180}
                            width={180}
                            options={
                                { maintainAspectRatio: false,
                                responsive:true}
                            }
                        />
                    </div>
                </div>
                <br/>
                <br/>

               
            </div>
            
        </div>
    )
}

export default Statbox