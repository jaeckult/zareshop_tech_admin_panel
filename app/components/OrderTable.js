"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/slices/ordersSlice';

export default function OrderTable() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Orders</h3>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 6).map((order, idx) => (
            <tr
              key={order.id || idx}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-4 text-gray-900">{order.id}</td>
              <td className="py-4 text-gray-700">{order.user_id}</td>
              <td className="py-4 text-gray-700">{order.status}</td>
              <td className="py-4 text-gray-800">{order.total}</td>
              <td className="py-4 text-gray-600">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
