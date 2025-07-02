"use client";
import { FaBell, FaSearch } from 'react-icons/fa'

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow">
      <div className="text-sm text-gray-800">Oct 11, 2023 - Nov 11, 2022</div>
      <div className="flex items-center gap-4">
        <FaSearch className="text-gray-800" />
        <FaBell className="text-gray-800" />
        <div className="relative">
          <button className="text-sm bg-gray-200 px-4 py-1 rounded text-gray-900">Admin</button>
        </div>
      </div>
    </div>
  )
}
