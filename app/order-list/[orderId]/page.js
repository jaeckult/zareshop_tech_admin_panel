'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Topbar from '../../components/TopBar';
import { FaCalendarAlt, FaPrint, FaSave, FaUser, FaTruck, FaDownload, FaCreditCard, FaEllipsisV } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderDetails } from '../../redux/slices/orderSlice';

export default function OrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(null);

  useEffect(() => {
    if (!params?.orderId) return;
    dispatch(fetchOrderDetails(params.orderId));
  }, [params?.orderId, dispatch]);

  useEffect(() => {
    if (order && order.status) setStatus(order.status);
  }, [order]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setStatusError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        const err = await res.json();
        setStatusError(err.message || 'Failed to update status');
        return;
      }
      dispatch(fetchOrderDetails(params.orderId));
    } catch (err) {
      setStatusError(err.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!order) return <div className="p-8 text-red-600">Order not found.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with categories */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" /> Arik
        </h1>
        <nav>
          <ul className="space-y-2 mb-8">
            <li>
              <a href="/dashboard" className="block font-medium rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-900">Dashboard</a>
            </li>
            <li>
              <a href="/all-products" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">All Products</a>
            </li>
            <li>
              <a href="/order-list" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">Order List</a>
            </li>
          </ul>
          
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Order Details</h2>
            <div className="text-sm text-gray-500 mt-1">Home &gt; Order List &gt; Order Details</div>
          </div>
          {/* Order Info Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-gray-900">Order ID: {order._id || order.id}</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-bold">{order.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <span>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <select className="bg-gray-200 px-3 py-2 rounded text-gray-700" value={status} onChange={handleStatusChange}>
                  <option value="">Change Status</option>
                  <option value="Pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
                <button className="bg-gray-200 p-2 rounded" aria-label="Print order"><FaPrint /></button>
                <button className="bg-gray-200 p-2 rounded" aria-label="Save order"><FaSave /></button>
              </div>
            </div>
            {statusError && <div className="text-red-600 mb-2">{statusError}</div>}
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaUser className="text-gray-500" /><span className="font-semibold">Customer</span></div>
                <div className="text-sm text-gray-900 font-bold">Full Name: {order.user?.name ?? order.customer?.name ?? 'N/A'}</div>
                <div className="text-xs text-gray-700">Email: {order.user?.email ?? order.customer?.email ?? 'N/A'}</div>
                <div className="text-xs text-gray-700 mb-2">Phone: {order.user?.phone_number ?? order.customer?.phone ?? 'N/A'}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">View profile</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaTruck className="text-gray-500" /><span className="font-semibold">Order Info</span></div>
                <div className="text-xs text-gray-700">Shipping: {order.address?.address_line1 ?? order.shipping?.address ?? 'N/A'}</div>
                <div className="text-xs text-gray-700">Payment Method: {order.paymentMethod ?? order.orderInfo?.paymentMethod ?? 'N/A'}</div>
                <div className="text-xs text-gray-700 mb-2">Status: {order.status ?? order.orderInfo?.status ?? 'N/A'}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold flex items-center gap-1"><FaDownload /> Download info</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaTruck className="text-gray-500" /><span className="font-semibold">Deliver to</span></div>
                <div className="text-xs text-gray-700 mb-2">Address: {order.address?.address_line1 ?? order.shipping?.address ?? 'N/A'}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">View profile</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaCreditCard className="text-gray-500" /><span className="font-semibold">Payment Info</span></div>
                <div className="text-xs text-gray-700">{order.paymentMethod ?? order.payment?.method ?? 'N/A'}</div>
                {/* Add more payment info fields as needed */}
              </div>
            </div>
            {/* Note */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div></div>
              <div></div>
              <div></div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="font-semibold mb-2">Note</div>
                <textarea className="w-full p-2 rounded border text-xs" placeholder="Type some notes" rows={3}></textarea>
              </div>
            </div>
          </div>
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Products</h3>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><FaEllipsisV /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th scope="col" className="px-3 py-2 text-left font-semibold"><input type="checkbox" aria-label="Select all products" /></th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Product Name</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products?.map((product, idx) => (
                    <tr
                      key={product.product_id || idx}
                      className="border-t border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td className="px-3 py-2"><input type="checkbox" aria-label={`Select ${product.product_id}`} /></td>
                      <td className="px-3 py-2">{product.product_id}</td>
                      <td className="px-3 py-2">{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Summary */}
            {/* If backend provides summary, display it here */}
          </div>
        </main>
        {/* Footer */}
        <footer className="p-4 text-xs text-gray-500 flex justify-between bg-white border-t mt-auto">
          <span>© 2023 - Zareshop admin Dashboard</span>
          <span>
            <a href="#" className="hover:underline mx-2">About</a>
            <a href="#" className="hover:underline mx-2">Careers</a>
            <a href="#" className="hover:underline mx-2">Policy</a>
            <a href="#" className="hover:underline mx-2">Contact</a>
          </span>
        </footer>
      </div>
    </div>
  );
} 