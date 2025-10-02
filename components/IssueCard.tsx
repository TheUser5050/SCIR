"use client"
import React from 'react';
import { FireIcon, ArrowUpIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const IssueCard: React.FC = () => {
  return (
    // Card Background and Border
    // Light Mode (Default): bg-white, border-gray-200
    // Dark Mode: dark:bg-gray-800, dark:border-gray-700
    <div className="relative bg-white dark:bg-gray-800 dark:bg-opacity-70 dark:backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-lg mx-auto transition-colors duration-300">

      {/* Top Row: Critical & Status */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-orange-600 dark:text-orange-400 font-bold text-sm uppercase">
          <FireIcon className="h-5 w-5 mr-2" />
          CRITICAL
        </div>
        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Reported - 5 min ago
        </span>
      </div>

      {/* Main Content Area: Image & Details */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-shrink-0 w-32 h-24 rounded-md overflow-hidden">
          <img
            src="https://thumbs.dreamstime.com/b/pot-hole-residential-road-surface-large-deep-pothole-example-poor-maintance-due-to-reducing-local-council-repair-budgets-31366892.jpg"
            alt="Massive Pothole"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="flex-grow text-gray-900 dark:text-white"> {/* Updated main text color */}
          <h3 className="text-xl font-bold mb-1 leading-tight">Massive Pothole on Oak & 5th Ave</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm"> {/* Updated secondary text color */}
            Location: 123 Main St, Springfield, IL
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs"> {/* Updated tertiary text color */}
            Category: Road Hazard
          </p>
        </div>
      </div>

      {/* Bottom Row: Upvotes, GPS, Assigned */}
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300"> {/* Updated footer text color */}
        <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
          <ArrowUpIcon className="h-4 w-4 mr-1" />
          17 UPVOTES
        </div>
        <div className="flex items-center">
          <MapPinIcon className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
          GPS: 40.8123, -89.654
        </div>
        <div className="flex items-center">
          <UserGroupIcon className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
          Assigned: Public Works Dept.
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
