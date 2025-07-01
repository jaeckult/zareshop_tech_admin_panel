"use client";
import Sidebar from '../components/SideBar'
import Topbar from '../components/TopBar'
import StatCard from '../components/StatCard'
import OrderTable from '../components/OrderTable'
import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    returnOrders: 0
  });

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        // Calculate stats from data.orders
        const orders = data.orders || [];
        const totalOrders = orders.length;
        const activeOrders = orders.filter(o => o.status === 'Pending').length;
        const completedOrders = orders.filter(o => o.status === 'Delivered').length;
        const returnOrders = orders.filter(o => o.status === 'Canceled').length;
        setStats({ totalOrders, activeOrders, completedOrders, returnOrders });
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar showCategories={false} />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Orders" value={stats.totalOrders}  />
            <StatCard title="Active Orders" value={stats.activeOrders}  />
            <StatCard title="Completed Orders" value={stats.completedOrders}  />
            <StatCard title="Return Orders" value={stats.returnOrders} />
          </div>
          <OrderTable />
        </main>
      </div>
    </div>
  )
} 