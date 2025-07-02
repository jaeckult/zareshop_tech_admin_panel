"use client";
import { useSelector } from 'react-redux';

export default function Categories() {
  const categories = useSelector((state) => state.products.categories);
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-800 mb-10">Categories</h1>
      <select name="categories" id="categories">
        {categories.map((cat, idx) => (
          <option key={idx} value={cat.name}>{cat.name}</option>
        ))}
      </select>
    </aside>
  )
}
