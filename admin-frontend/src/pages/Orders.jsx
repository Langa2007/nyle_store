import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:5000/api/orders/admin/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter(order =>
    order.username?.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toString().includes(search)
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      <input
        type="text"
        placeholder="Search by username or order ID"
        className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total (KES)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3">Items</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.username || 'N/A'}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{new Date(order.created_at).toLocaleString()}</td>
                <td className="p-3">
                  {order.items?.map(item => (
                    <div key={item.product_id}>
                      {item.product_name} × {item.quantity}
                    </div>
                  )) || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-6">No orders found.</p>
        )}
      </div>
    </div>
  );
}
