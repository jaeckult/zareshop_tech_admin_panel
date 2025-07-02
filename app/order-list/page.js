"use client";
import Sidebar from '../components/SideBar';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { FaEllipsisV, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Topbar = dynamic(() => import('../components/TopBar'), {
  loading: () => <div className="p-4">Loading top bar...</div>,
});

export default function OrderList() {
  
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        // Attach product name to each order if possible
        const ordersWithProduct = (data.orders || []).map(order => {
          // Try to find a product for this order (by id or other logic)
          // Here, as a placeholder, just use the first product if exists
          let productName = '';
          if (data.products && data.products.length > 0) {
            productName = data.products[0].title;
          }
          return { ...order, productName };
        });
        setOrders(ordersWithProduct);
      });
  }, []);

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
                    <th className="px-3 py-2 text-left font-semibold">
                      <input type="checkbox" />
                    </th>
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
                    <tr
                      key={order.id + idx}
                      className="border-t border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => router.push(`/order-list/${order.id.replace('#', '')}`)}
                    >
                      <td className="px-3 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="px-3 py-2">{order.productName || 'N/A'}</td>
                      <td className="px-3 py-2">{order.id}</td>
                      <td className="px-3 py-2">{order.date}</td>
                      <td className="px-3 py-2 flex items-center gap-2">
                        <img src={order.avatar} alt={order.customer} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-gray-900">{order.customer}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-blue-200 text-blue-900'
                            : 'bg-orange-200 text-orange-900'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-blue-700'
                              : 'bg-orange-700'
                          }`}></span>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">{order.amount}</td>
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
