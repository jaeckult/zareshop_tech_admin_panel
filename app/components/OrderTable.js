"use client";
import { useSmartFetch } from '../hooks/useSmartFetch';
import { fetchOrders } from '../redux/slices/ordersSlice';
import SkeletonLoader from './SkeletonLoader';

export default function OrderTable() {
  const { orders, loading, error } = useSmartFetch(
    fetchOrders,
    (state) => state.orders
  );

  if (loading && orders.length === 0) {
    return <SkeletonLoader type="table" />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        Error: {error}
      </div>
    );
  }

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
