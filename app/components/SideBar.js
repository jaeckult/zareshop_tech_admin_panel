"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar({ showCategories }) {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className={`block font-medium rounded px-3 py-2 transition-colors ${pathname === '/' ? 'bg-blue-100 text-blue-800' : 'text-gray-900 hover:bg-gray-100'}`}>Dashboard</Link>
          </li>
          <li>
            <Link href="/all-products" className={`block rounded px-3 py-2 transition-colors ${pathname === '/all-products' ? 'bg-blue-100 text-blue-800' : 'text-gray-800 hover:bg-gray-100'}`}>All Products</Link>
          </li>
          <li>
            <Link href="/order-list" className={`block rounded px-3 py-2 transition-colors ${pathname === '/order-list' ? 'bg-blue-100 text-blue-800' : 'text-gray-800 hover:bg-gray-100'}`}>Order List</Link>
          </li>
        </ul>
        {showCategories && (
          <div className="mt-8">
            {/* Categories section placeholder */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Categories</h2>
            {/* You can render the Categories component here if needed */}
          </div>
        )}
      </nav>
    </aside>
  )
}
