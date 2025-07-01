import Sidebar from './components/SideBar'
import Topbar from './components/TopBar'
import StatCard from './components/StatCard'
import OrderTable from './components/OrderTable'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Orders" value="$126.500"  />
            <StatCard title="Active Orders" value="$126.500"  />
            <StatCard title="Completed Orders" value="$126.500"  />
            <StatCard title="Return Orders" value="$126.500" />
          </div>
          <OrderTable />
        </main>
      </div>
    </div>
  )
} 