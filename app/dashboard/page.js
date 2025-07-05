"use client";
import Topbar from '../components/TopBar'
import StatCard from '../components/StatCard'
import OrderTable from '../components/OrderTable'
import LoadingSpinner from '../components/LoadingSpinner'
import SkeletonLoader from '../components/SkeletonLoader'
import PageWrapper from '../components/PageWrapper'
import { useSmartFetch } from '../hooks/useSmartFetch';
import { fetchDashboardStats } from '../redux/slices/dashboardSlice';

export default function Home() {
  const { stats, loading: statsLoading, error } = useSmartFetch(
    fetchDashboardStats,
    (state) => state.dashboard
  );

  const renderContent = () => {
    if (statsLoading && Object.keys(stats).length === 0) {
      return (
        <>
          <Topbar />
          <main className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard</h2>
            <SkeletonLoader type="stats" />
            <div className="mt-6">
              <SkeletonLoader type="table" />
            </div>
          </main>
        </>
      );
    }
    
    if (error) {
      return (
        <>
          <Topbar />
          <main className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              Error: {error}
            </div>
          </main>
        </>
      );
    }

    return (
      <>
        <Topbar />
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Users" value={stats.users} />
            <StatCard title="Products" value={stats.products} />
            <StatCard title="Categories" value={stats.categories} />
            <StatCard title="Orders" value={stats.orders} />
          </div>
          <OrderTable />
        </main>
      </>
    );
  };

  return (
    <PageWrapper sidebarProps={{ showCategories: false }}>
      {renderContent()}
    </PageWrapper>
  );
} 