"use client";
import { FaBell, FaSearch } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      if (pathname === '/order-list') {
        router.push(`/order-list?q=${encodeURIComponent(search)}`);
      } else {
        router.push(`/search?q=${encodeURIComponent(search)}`);
      }
      setShowSearchInput(false);
      setSearch('');
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow">
      <div className="text-sm text-gray-800">Oct 11, 2023 - Nov 11, 2022</div>
      <div className="flex items-center gap-4">
        {/* Hide search icon on dashboard */}
        {pathname !== '/dashboard' && (
          <>
            {showSearchInput ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="text-blue-700 font-semibold" disabled={!search.trim()}>Go</button>
                <button type="button" className="text-gray-500" onClick={() => setShowSearchInput(false)}>&times;</button>
              </form>
            ) : (
              <FaSearch className="text-gray-800 cursor-pointer" onClick={() => setShowSearchInput(true)} />
            )}
          </>
        )}
        <FaBell className="text-gray-800" />
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-sm bg-gray-200 px-4 py-1 rounded text-gray-900 focus:outline-none"
            onClick={() => setOpen((v) => !v)}
          >
            Admin
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
