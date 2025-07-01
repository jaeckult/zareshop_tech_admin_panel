"use client";
import Sidebar from '../../components/SideBar';
import Topbar from '../../components/TopBar';
import { FaEllipsisV, FaCalendarAlt, FaUser, FaDownload, FaCreditCard, FaTruck, FaSave, FaPrint } from 'react-icons/fa';

const categories = [
  { name: 'Lorem Ipsum', count: 21 },
  { name: 'Lorem Ipsum', count: 32 },
  { name: 'Lorem Ipsum', count: 13 },
  { name: 'Lorem Ipsum', count: 14 },
  { name: 'Lorem Ipsum', count: 6 },
  { name: 'Lorem Ipsum', count: 11 },
];

const order = {
  id: '#6743',
  status: 'Pending',
  dateRange: 'Feb 16,2022 - Feb 20,2022',
  customer: {
    name: 'Shristi Singh',
    email: 'shristi@gmail.com',
    phone: '+91 904 231 1212',
  },
  payment: {
    method: 'Master Card **** **** 6557',
    business: 'Shristi Singh',
    phone: '+91 904 231 1212',
  },
  shipping: {
    address: 'Dharam Colony, Palam Vihar, Gurgaon, Haryana',
  },
  orderInfo: {
    shipping: 'Next express',
    paymentMethod: 'Paypal',
    status: 'Pending',
  },
  products: [
    { name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
    { name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
    { name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
    { name: 'Lorem Ipsum', orderId: '#25421', quantity: 2, total: 800.40 },
  ],
  summary: {
    subtotal: 3201.6,
    tax: 640.32,
    discount: 0,
    shipping: 0,
    total: 3841.92,
  },
};

export default function OrderDetails({ params }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with categories */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
          <img src="/next.svg" alt="Logo" className="w-8 h-8" /> Arik
        </h1>
        <nav>
          <ul className="space-y-2 mb-8">
            <li>
              <a href="/" className="block font-medium rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-900">Dashboard</a>
            </li>
            <li>
              <a href="/all-products" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">All Products</a>
            </li>
            <li>
              <a href="/order-list" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">Order List</a>
            </li>
          </ul>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Categories</h2>
            <ul className="space-y-1">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    className={`flex items-center justify-between w-full px-2 py-1 rounded transition-colors text-gray-800 hover:bg-gray-100`}
                  >
                    <span>{cat.name}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs bg-gray-200 text-gray-700`}>{cat.count.toString().padStart(2, '0')}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Orders Details</h2>
            <div className="text-sm text-gray-500 mt-1">Home &gt; Order List &gt; Order Details</div>
          </div>
          {/* Order Info Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-lg text-gray-900">Orders ID: {order.id}</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs font-bold">{order.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <span>{order.dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <select className="bg-gray-200 px-3 py-2 rounded text-gray-700">
                  <option>Change Status</option>
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Canceled</option>
                </select>
                <button className="bg-gray-200 p-2 rounded"><FaPrint /></button>
                <button className="bg-gray-200 p-2 rounded"><FaSave /></button>
              </div>
            </div>
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaUser className="text-gray-500" /><span className="font-semibold">Customer</span></div>
                <div className="text-sm text-gray-900 font-bold">Full Name: {order.customer.name}</div>
                <div className="text-xs text-gray-700">Email: {order.customer.email}</div>
                <div className="text-xs text-gray-700 mb-2">Phone: {order.customer.phone}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">View profile</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaTruck className="text-gray-500" /><span className="font-semibold">Order Info</span></div>
                <div className="text-xs text-gray-700">Shipping: {order.orderInfo.shipping}</div>
                <div className="text-xs text-gray-700">Payment Method: {order.orderInfo.paymentMethod}</div>
                <div className="text-xs text-gray-700 mb-2">Status: {order.orderInfo.status}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold flex items-center gap-1"><FaDownload /> Download info</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaTruck className="text-gray-500" /><span className="font-semibold">Deliver to</span></div>
                <div className="text-xs text-gray-700 mb-2">Address: {order.shipping.address}</div>
                <button className="bg-blue-900 text-white px-4 py-1 rounded text-xs font-semibold">View profile</button>
              </div>
              <div className="bg-gray-50 rounded p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2"><FaCreditCard className="text-gray-500" /><span className="font-semibold">Payment Info</span></div>
                <div className="text-xs text-gray-700">{order.payment.method}</div>
                <div className="text-xs text-gray-700">Business name: {order.payment.business}</div>
                <div className="text-xs text-gray-700">Phone: {order.payment.phone}</div>
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
                    <th className="px-3 py-2 text-left font-semibold"><input type="checkbox" /></th>
                    <th className="px-3 py-2 text-left font-semibold">Product Name</th>
                    <th className="px-3 py-2 text-left font-semibold">Order ID</th>
                    <th className="px-3 py-2 text-left font-semibold">Quantity</th>
                    <th className="px-3 py-2 text-left font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, idx) => (
                    <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-3 py-2"><input type="checkbox" /></td>
                      <td className="px-3 py-2">{product.name}</td>
                      <td className="px-3 py-2">{product.orderId}</td>
                      <td className="px-3 py-2">{product.quantity}</td>
                      <td className="px-3 py-2">₹{product.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Summary */}
            <div className="flex flex-col items-end mt-4">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-1 text-gray-700"><span>Subtotal</span><span>₹{order.summary.subtotal}</span></div>
                <div className="flex justify-between py-1 text-gray-700"><span>Tax (20%)</span><span>₹{order.summary.tax}</span></div>
                <div className="flex justify-between py-1 text-gray-700"><span>Discount</span><span>₹{order.summary.discount}</span></div>
                <div className="flex justify-between py-1 text-gray-700"><span>Shipping Rate</span><span>₹{order.summary.shipping}</span></div>
                <div className="flex justify-between py-2 text-lg font-bold text-gray-900 border-t mt-2"><span>Total</span><span>₹{order.summary.total}</span></div>
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