"use client";
import Sidebar from '../components/SideBar'
import Topbar from '../components/TopBar'
import { useState, useEffect } from 'react'
import { FaEllipsisV } from 'react-icons/fa'

export default function AllProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setProducts(data.products || []);
      });
  }, []);

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
              <a href="/all-products" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">All Products</a>
            </li>
            <li>
              <a href="/order-list" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">Order List</a>
            </li>
          </ul>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Categories</h2>
            <ul className="space-y-1">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    className={`flex items-center justify-between w-full px-2 py-1 rounded transition-colors ${activeCategory === idx ? 'bg-blue-100 text-blue-800 font-bold' : 'text-gray-800 hover:bg-gray-100'}`}
                    onClick={() => setActiveCategory(idx)}
                  >
                    <span>{cat.name}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${activeCategory === idx ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'}`}>{cat.count?.toString().padStart(2, '0')}</span>
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
              <div className="text-sm text-gray-500 mt-1">Home &gt; All Products</div>
            </div>
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded shadow transition flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              + Add New Product
            </button>
          </div>
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product, idx) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><FaEllipsisV /></button>
                </div>
                <div className="font-bold text-gray-900">{product.title}</div>
                <div className="text-xs text-gray-500 mb-1">{product.subtitle}</div>
                <div className="font-semibold text-lg text-gray-900 mb-2">{product.price}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Summary</div>
                <div className="text-xs text-gray-500 mb-2">{product.summary}</div>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">Sales</span>
                    <span className="text-orange-600 font-bold flex items-center gap-1">↑ {product.sales}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">Remaining Products</span>
                    <span className="text-orange-600 font-bold flex items-center gap-1">{product.remaining}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center">
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
        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add Product</h3>
              <form onSubmit={e => { e.preventDefault(); setShowModal(false); }}>
                <input className="w-full mb-3 p-2 border rounded" placeholder="Product Name" required />
                <input className="w-full mb-3 p-2 border rounded" placeholder="Price" type="number" required />
                <div className="flex justify-end gap-2">
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 