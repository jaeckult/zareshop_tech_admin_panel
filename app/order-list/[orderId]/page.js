'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Topbar from '../../components/TopBar';
import { FaCalendarAlt, FaUser, FaTruck, FaMapMarkerAlt, FaBox } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderDetails } from '../../redux/slices/orderSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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
    setIsUpdating(true);
    
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
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBackToOrders = () => {
    router.push('/order-list');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
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
        <div className="flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 bg-gray-50">
            <SkeletonLoader type="card" count={3} />
          </main>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
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
        <div className="flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 bg-gray-50">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              Error: {error}
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
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
        <div className="flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 bg-gray-50">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
              Order not found.
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
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
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Order Details</h2>
              <div className="text-sm text-gray-500 mt-1">Home &gt; Order List &gt; Order Details</div>
            </div>
            <button
              onClick={handleBackToOrders}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Back to Orders
            </button>
          </div>

          {/* Order Info Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-gray-900">Order ID: {order._id || order.id}</span>
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-gray-500" />
                  <span className="text-sm">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    className="bg-gray-100 px-3 py-2 rounded text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={status} 
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                  >
                    <option value="">Change Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {isUpdating && <LoadingSpinner size="small" />}
                </div>
              </div>
            </div>
            
            {statusError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {statusError}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaUser className="text-gray-500" />
                  <span className="font-semibold text-gray-900">Customer Information</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">User ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{order.user_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Order Date:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span className="font-semibold text-gray-900">Shipping Address</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Address ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{order.address_id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaTruck className="text-gray-500" />
                  <span className="font-semibold text-gray-900">Order Summary</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Total Items:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {order.products?.reduce((sum, product) => sum + (product.quantity || 0), 0) || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Products:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      {order.products?.length || 0} items
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaBox className="text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Order Products</h3>
            </div>
            
            {order.products && order.products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-700 border-b">
                      <th className="px-4 py-3 text-left font-semibold">Product ID</th>
                      <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, idx) => (
                      <tr
                        key={product.product_id || idx}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-900 font-medium">
                          {product.product_id || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {product.quantity || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No products found in this order.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 