'use client';

import { useState, useEffect } from 'react';
import TransactionDashboard from './TransactionDashboard';
import Graph from './Graph';
import axios from 'axios';

export default function BarChartDasboard() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [month, setMonth] = useState('');
  const [stats, setStats] = useState([]);
  const [year, setYear] = useState(2022); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://statisticsbackend.onrender.com/api/transactions', {
          params: { search, page, perPage, month, year }
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search, page, perPage, month, year]);

  console.log(stats); 

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search transaction"
          className="p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="p-2 mr-4"
        >
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
        </select>
      </div>

     
      {stats.length === 0 ? <p>No transactions found.</p> : (
        <div className='w-full overflow-x-auto'>
          <table className="border-collapse bg-yellow-200 rounded-lg w-full min-w-max text-sm">
            <thead>
              <tr className="bg-yellow-300">
                <th className="border p-1">ID</th>
                <th className="border p-1">Title</th>
                <th className="border p-1">Description</th>
                <th className="border p-1">Price</th>
                <th className="border p-1">Category</th>
                <th className="border p-1">Sold</th>
                <th className="border p-1">Image</th>
              </tr>
            </thead>
            <tbody>
              {stats
                .filter((t) =>
                  t.title.toLowerCase().includes(search.toLowerCase())
                )
                .filter((t) =>
                  month ? t.dateOfSale.includes(`-${month}-`) : true
                )
                .map((t) => (
                  <tr key={t._id} className="border">
                    <td className="border p-1">{t.id}</td>
                    <td className="border p-1">{t.title}</td>
                    <td className="border p-1 truncate max-w-xs">{t.description}</td>
                    <td className="border p-1">${t.price}</td>
                    <td className="border p-1">{t.category}</td>
                    <td className="border p-1">{t.sold ? 'Yes' : 'No'}</td>
                    <td className="border p-1">
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-8 h-8 object-cover"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='mt-5 flex flex-row gap-x-24'>
        <TransactionDashboard />
      </div>

      <h2 className="text-2xl font-bold mt-8">Bar Chart Stats</h2>
      <Graph />
    </div>
  );
}
