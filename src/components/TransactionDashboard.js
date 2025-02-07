'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TransactionDashboard() {
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2021);
  const [stats, setStats] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://statisticsbackend.onrender.com/api/stats', {
          params: { month, year }
        });
        setStats(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [month, year]);

  return (
    <div className="w-[500px] mt-24 h-[380px] flex flex-col items-center justify-center p-4 bg-yellow-200 rounded-lg mb-6">
      <div className="flex mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="p-2 mr-4"
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index + 1}>{name}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2"
        >
          {[2021, 2022, 2023, 2024].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      
      <h2 className="text-2xl font-bold mb-2">Statistics - {monthNames[month - 1]}</h2>
      
      <p className="flex justify-between w-full px-4">
        <span>Total Sale:</span> <span>${stats.totalSaleAmount.toFixed(2)}</span>
      </p>
      <p className="flex justify-between w-full px-4">
        <span>Total Sold Items:</span> <span>{stats.totalSoldItems}</span>
      </p>
      <p className="flex justify-between w-full px-4">
        <span>Total Not Sold Items:</span> <span>{stats.totalNotSoldItems}</span>
      </p>
    </div>
  );
}
