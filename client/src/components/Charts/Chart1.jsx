import React from 'react'
import './Chart1.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red'],
    datasets: [
        {
            label: '# of Votes',
            data: [12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderWidth: 1,
        },
    ],
};
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
    },
}
const Chart1 = () => {

    return (
        <div className='leave_charts_2_container'>
            <div className='leave_charts_2_div_1'>
                <Doughnut data={data} options={options} width={200} height={200} />
            </div>
            <div className='leave_charts_2_div_1'>
                <Doughnut data={data} options={options} width={250} height={250} />
            </div>

        </div>
    )
}

export default Chart1