import React from 'react';

/**
 * Stat Card Component
 * Features: Icon, value, label, optional trend
 * Usage: Display key statistics on dashboard and home page
 */
const StatCard = ({ icon: Icon, label, value, trend = null, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary-600 to-primary-700',
    secondary: 'from-secondary-600 to-secondary-700',
    accent: 'from-accent-500 to-accent-600',
    green: 'from-green-600 to-green-700',
    blue: 'from-blue-600 to-blue-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          {trend && (
            <p
              className={`text-sm font-medium ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value} from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
