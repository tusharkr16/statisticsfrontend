import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Graph = () => {
    const [chartData, setChartData] = useState([]);
    const [month, setMonth] = useState(10);
    const [year, setYear] = useState(2021);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://statisticsbackend.onrender.com/api/bar-chart', {
                    params: { month, year }
                });
                setChartData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [month, year]);

    const data = {
        labels: chartData.map(item => item.range),
        datasets: [
            {
                label: 'Count',
                data: chartData.map(item => item.count),
                backgroundColor: '#66d9ff',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,  
    };

    return (
        <div>
            <div className="flex mb-4">
                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="p-2 mr-4"
                >
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="p-2"
                >
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                </select>
            </div>

            <div style={{ width: '790px', height: '400px' }}>  
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Graph;
