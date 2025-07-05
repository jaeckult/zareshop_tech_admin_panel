"use client";
export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-4 rounded shadow text-sm hover-lift">
      <h3 className="text-gray-800 mb-1">{title}</h3>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  )
}
