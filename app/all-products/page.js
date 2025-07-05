"use client";
import Sidebar from '../components/SideBar'
import Topbar from '../components/TopBar'
import { useState, useEffect } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { useSmartFetch } from '../hooks/useSmartFetch';
import { fetchProductsData } from '../redux/slices/productsSlice';
import SkeletonLoader from '../components/SkeletonLoader';
import { sortData } from '../utils/sortUtils';

export default function AllProducts() {
  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [currentSort, setCurrentSort] = useState({ key: 'name', direction: 'asc' });
  const { products, loading, error } = useSmartFetch(
    fetchProductsData,
    (state) => state.products
  );
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });
  const [addError, setAddError] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock)
        })
      });
      if (!res.ok) {
        const err = await res.json();
        setAddError(err.message || 'Failed to add product');
        return;
      }
      setShowModal(false);
      setNewProduct({ name: '', description: '', price: '', stock: '' });
      dispatch(fetchProductsData());
    } catch (err) {
      setAddError(err.message);
    }
  };

  const sortedProducts = sortData(products, currentSort.key, currentSort.direction);

  const handleSort = (key, direction) => {
    setCurrentSort({ key, direction });
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
            Zareshop
          </h1>
          <nav>
            <ul className="space-y-2 mb-8">
              <li>
                <a href="/dashboard" className="block font-medium rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-900">Dashboard</a>
              </li>
              <li>
                <a href="/all-products" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">All Products</a>
              </li>
              <li>
                <a href="/order-list" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">Order List</a>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
                <div className="text-sm text-gray-500 mt-1">Home &gt; All Products</div>
              </div>
            </div>
            <SkeletonLoader type="card" count={8} />
          </main>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
          <h1 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
            Zareshop
          </h1>
          <nav>
            <ul className="space-y-2 mb-8">
              <li>
                <a href="/dashboard" className="block font-medium rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-900">Dashboard</a>
              </li>
              <li>
                <a href="/all-products" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">All Products</a>
              </li>
              <li>
                <a href="/order-list" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">Order List</a>
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (categories removed if not provided by backend) */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-blue-800 mb-10 flex items-center gap-2">
          Zareshop
        </h1>
        <nav>
          <ul className="space-y-2 mb-8">
            <li>
              <a href="/dashboard" className="block font-medium rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-900">Dashboard</a>
            </li>
            <li>
              <a href="/all-products" className="block rounded px-3 py-2 transition-colors bg-blue-100 text-blue-800 font-medium">All Products</a>
            </li>
            <li>
              <a href="/order-list" className="block rounded px-3 py-2 transition-colors hover:bg-gray-100 text-gray-800">Order List</a>
            </li>
          </ul>
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
          {/* Sorting Controls */}
          <div className="mb-4 flex items-center gap-4 text-sm">
            <span className="text-gray-600">Sort by:</span>
            <button
              onClick={() => handleSort('name', currentSort.key === 'name' && currentSort.direction === 'asc' ? 'desc' : 'asc')}
              className={`px-3 py-1 rounded border transition-colors ${
                currentSort.key === 'name' 
                  ? 'bg-blue-100 text-blue-800 border-blue-300' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Name {currentSort.key === 'name' && (currentSort.direction === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('price', currentSort.key === 'price' && currentSort.direction === 'asc' ? 'desc' : 'asc')}
              className={`px-3 py-1 rounded border transition-colors ${
                currentSort.key === 'price' 
                  ? 'bg-blue-100 text-blue-800 border-blue-300' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Price {currentSort.key === 'price' && (currentSort.direction === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('stock', currentSort.key === 'stock' && currentSort.direction === 'asc' ? 'desc' : 'asc')}
              className={`px-3 py-1 rounded border transition-colors ${
                currentSort.key === 'stock' 
                  ? 'bg-blue-100 text-blue-800 border-blue-300' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Stock {currentSort.key === 'stock' && (currentSort.direction === 'asc' ? '↑' : '↓')}
            </button>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sortedProducts.map((product, idx) => (
              <div key={product.id || idx} className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <img src={product.image || '/earbud.png'} alt={product.name} className="w-16 h-16 object-contain" />
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500"><FaEllipsisV /></button>
                </div>
                <div className="font-bold text-gray-900">{product.name}</div>
                <div className="text-xs text-gray-500 mb-1">{product.description}</div>
                <div className="font-semibold text-lg text-gray-900 mb-2">{product.price}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">Stock</div>
                <div className="text-xs text-gray-500 mb-2">{product.stock}</div>
                {/* Add more fields as needed from backend */}
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
          <span>© 2025 - Zareshop Dashboard</span>
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
              <form onSubmit={handleAddProduct}>
                <input className="w-full mb-3 p-2 border rounded" placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                <input className="w-full mb-3 p-2 border rounded" placeholder="Description" required value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                <input className="w-full mb-3 p-2 border rounded" placeholder="Price" type="number" required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                <input className="w-full mb-3 p-2 border rounded" placeholder="Stock" type="number" required value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                {addError && <div className="text-red-600 mb-2">{addError}</div>}
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