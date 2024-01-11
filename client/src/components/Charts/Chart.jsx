import React from 'react'
import './Chart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ totalUsers, totalPresentAttend, totalLateAttend, totalAbsentUsers }) => {
    const data = {
        labels: ["Total Users", "Total Present", "Total Late", "Total Absent"],
        datasets: [
            {
                data: [totalUsers, totalPresentAttend, totalLateAttend, totalAbsentUsers],
                backgroundColor: ['#1AA7EC', '#AFFFAD', '#B8E1FF', "#ff7b7b"]
            }
        ]
    };
    const options = {
    }


    return (
        <div className='admin-charts'>
            <div className='chart-div'>
                <Pie data={data} options={options}>
                </Pie>
                <p>Total Users</p>
            </div>
            {/* <div className='chart-div'>
                <Pie data={data1} options={options1}>
                </Pie>
                <p>Total Present Today</p>
            </div>
            <div className='chart-div'>
                <Pie data={data2} options2={options1}>
                </Pie>
                <p>Total Late Users</p>
            </div> */}
        </div>


    )
}

export default Chart