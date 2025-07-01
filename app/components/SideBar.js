export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h1 className="text-2xl font-bold text-blue-800 mb-10">Zareshop</h1>
      <nav>
        <ul className="space-y-4">
          <li><a className="block font-medium text-gray-900 hover:text-blue-800 " href="#">Dashboard</a></li>
          <li><a className="block text-gray-800 hover:text-blue-800" href="#">All Products</a></li>
          <li><a className="block text-gray-800 hover:text-blue-800" href="#">Order List</a></li>
        </ul>
      </nav>
    </aside>
  )
}
