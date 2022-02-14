import React from 'react'
import { Pie,Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);


const MyChart = (props:any) => {
  return (
    <div>
      <Doughnut
        data={{
        //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
            //   label: '# of votes',
              data: [80,20],
              backgroundColor: [
                'rgba(190,174,226, 0.8)',
                'rgba(54, 162, 235, 0.2)',
              ],
            //   borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //   ],
              borderWidth: 1,
              hoverOffset:3,
            
            },
            
          ],
          
        }}
        height={180}
        width={180}
        
        options={
            
            { maintainAspectRatio: false,
            responsive:true,
             }
        }
      />
    </div>
  )
}

export default MyChart