"use client";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function SortableHeader({ 
  label, 
  sortKey, 
  currentSort, 
  onSort, 
  className = "" 
}) {
  const getSortIcon = () => {
    if (currentSort.key !== sortKey) {
      return <FaSort className="text-gray-400" />;
    }
    return currentSort.direction === 'asc' 
      ? <FaSortUp className="text-blue-600" /> 
      : <FaSortDown className="text-blue-600" />;
  };

  const handleClick = () => {
    const newDirection = currentSort.key === sortKey && currentSort.direction === 'asc' ? 'desc' : 'asc';
    onSort(sortKey, newDirection);
  };

  return (
    <th 
      className={`px-3 py-2 text-left font-semibold cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {getSortIcon()}
      </div>
    </th>
  );
} 