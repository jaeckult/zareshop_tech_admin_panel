"use client";
import Sidebar from '../components/SideBar'
import Topbar from '../components/TopBar'
import StatCard from '../components/StatCard'
import OrderTable from '../components/OrderTable'
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadUserFromStorage } from '../redux/slices/authSlice';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stats, loading: statsLoading, error } = useSelector((state) => state.dashboard);
  const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || statsLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

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