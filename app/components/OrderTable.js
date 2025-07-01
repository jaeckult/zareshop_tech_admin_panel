"use client";
import { useState, useEffect } from 'react';

export default function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setOrders((data.orders || []).slice(0, 6));
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Orders</h3>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th>Product</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-4 text-gray-800">Lorem Ipsum</td>
              <td className="py-4 text-gray-900">{order.id}</td>
              <td className="py-4 text-gray-600">{order.date}</td>
              <td className="py-4 text-gray-700">{order.customer}</td>
              <td
                className={`py-4 font-medium ${
                  order.status === 'Delivered'
                    ? 'text-green-600'
                    : 'text-orange-500'
                }`}
              >
                {order.status}
              </td>
              <td className="py-4 text-gray-800">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
