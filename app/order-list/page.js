"use client";
import Sidebar from '../components/SideBar';
import Topbar from '../components/TopBar';
import { useState } from 'react';
import { FaEllipsisV, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';

const categories = [
  { name: 'Lorem Ipsum', count: 21 },
  { name: 'Lorem Ipsum', count: 32 },
  { name: 'Lorem Ipsum', count: 13 },
  { name: 'Lorem Ipsum', count: 14 },
  { name: 'Lorem Ipsum', count: 6 },
  { name: 'Lorem Ipsum', count: 11 },
];

const orders = [
  { id: '#25426', date: 'Nov 8th,2023', customer: 'Kavin', status: 'Delivered', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25425', date: 'Nov 7th,2023', customer: 'Komael', status: 'Canceled', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25424', date: 'Nov 6th,2023', customer: 'Nikhil', status: 'Delivered', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25423', date: 'Nov 5th,2023', customer: 'Shivam', status: 'Canceled', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25422', date: 'Nov 4th,2023', customer: 'Shadab', status: 'Delivered', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25421', date: 'Nov 2nd,2023', customer: 'Yogesh', status: 'Delivered', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25423', date: 'Nov 1st,2023', customer: 'Sunita', status: 'Canceled', amount: '₹200.00', avatar: '/next.svg' },
  { id: '#25421', date: 'Nov 1st,2023', customer: 'Priyanka', status: 'Delivered', amount: '₹200.00', avatar: '/next.svg' },
];

export default function OrderList() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showCategories={false} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Orders List</h2>
              <div className="text-sm text-gray-500 mt-1">Home &gt; Order List</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border rounded px-4 py-2 text-gray-700">
                <FaCalendarAlt className="text-gray-500" />
                <span>Feb 16,2022 - Feb 20,2022</span>
              </div>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded border flex items-center gap-2">Change Status <FaEllipsisV /></button>
            </div>
          </div>
          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Purchases</h3>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><FaEllipsisV /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="px-3 py-2 text-left font-semibold"><input type="checkbox" /></th>
                    <th className="px-3 py-2 text-left font-semibold">Product</th>
                    <th className="px-3 py-2 text-left font-semibold">Order ID</th>
                    <th className="px-3 py-2 text-left font-semibold">Date</th>
                    <th className="px-3 py-2 text-left font-semibold">Customer Name</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <Link href={`/order-list/${order.id.replace('#', '')}`} key={order.id + idx} className="contents">
                      <tr className="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer">
                        <td className="px-3 py-2"><input type="checkbox" /></td>
                        <td className="px-3 py-2">Lorem Ipsum</td>
                        <td className="px-3 py-2">{order.id}</td>
                        <td className="px-3 py-2">{order.date}</td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <img src={order.avatar} alt={order.customer} className="w-6 h-6 rounded-full object-cover" />
                          {order.customer}
                        </td>
                        <td className="px-3 py-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${order.status === 'Delivered' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                            <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-blue-600' : 'bg-orange-500'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">{order.amount}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div></div>
              <div className="flex gap-1">
                {[1,2,3,4].map(page => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded border ${activePage === page ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-3 py-1">...</span>
                <button
                  className="px-3 py-1 rounded border bg-white text-black border-gray-300 hover:bg-gray-100"
                  onClick={() => setActivePage(activePage + 1)}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="p-4 text-xs text-gray-500 flex justify-between bg-white border-t mt-auto">
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
