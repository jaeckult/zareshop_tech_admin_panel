"use client";
import Sidebar from '../components/SideBar';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { FaEllipsisV, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/slices/ordersSlice';

const Topbar = dynamic(() => import('../components/TopBar'), {
  loading: () => <div className="p-4">Loading top bar...</div>,
});

export default function OrderList() {
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar  />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Orders List</h2>
              <div className="text-sm text-gray-700 mt-1">Home &gt; Order List</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border rounded px-4 py-2 text-gray-800">
                <FaCalendarAlt className="text-gray-600" />
                <span>Feb 16,2022 - Feb 20,2022</span>
              </div>
              <button className="bg-gray-300 text-gray-900 px-4 py-2 rounded border hover:bg-gray-400 transition flex items-center gap-2">
                Change Status <FaEllipsisV />
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Purchases</h3>
              <button className="p-2 rounded-full hover:bg-gray-200 text-gray-700">
                <FaEllipsisV />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-900">
                <thead>
                  <tr className="bg-gray-100 text-gray-800">
                    <th className="px-3 py-2 text-left font-semibold">Order ID</th>
                    <th className="px-3 py-2 text-left font-semibold">User ID</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Total</th>
                    <th className="px-3 py-2 text-left font-semibold">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr
                      key={order.id || idx}
                      className="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => router.push(`/order-list/${order.id}`)}
                    >
                      <td className="px-3 py-2">{order.id}</td>
                      <td className="px-3 py-2">{order.user_id}</td>
                      <td className="px-3 py-2">{order.status}</td>
                      <td className="px-3 py-2">{order.total}</td>
                      <td className="px-3 py-2">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div></div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(page => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded border font-medium ${
                      activePage === page
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-900 border-gray-400 hover:bg-gray-200'
                    }`}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-3 py-1 text-gray-800">...</span>
                <button
                  className="px-3 py-1 rounded border bg-white text-gray-900 border-gray-400 hover:bg-gray-200"
                  onClick={() => setActivePage(activePage + 1)}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-sm text-gray-700 flex justify-between bg-white border-t mt-auto">
          <span>© 2023 - pulstron Dashboard</span>
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
