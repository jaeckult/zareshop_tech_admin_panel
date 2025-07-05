"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageWrapper({ children, showSidebar = true, sidebarProps = {} }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (showSidebar) {
    const Sidebar = require('./SideBar').default;
    return (
      <div className={`flex min-h-screen ${isTransitioning ? 'bg-white' : 'bg-gray-100'}`}>
        <Sidebar {...sidebarProps} />
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isTransitioning ? 'bg-white' : 'bg-gray-100'}`}>
      {children}
    </div>
  );
} 