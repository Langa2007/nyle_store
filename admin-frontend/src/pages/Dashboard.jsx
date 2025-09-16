import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // assuming admin login stores token here
        const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">Total Users</h2>
          <p>{stats.total_users}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">Total Products</h2>
          <p>{stats.total_products}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">Total Orders</h2>
          <p>{stats.total_orders}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold text-lg">Total Revenue</h2>
          <p>KES {stats.total_revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Recent Orders</h2>
        <ul className="space-y-2">
          {stats.recent_orders.map(order => (
            <li key={order.id} className="border p-2 rounded">
              Order #{order.id} by {order.username} — KES {order.total} on {new Date(order.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;


