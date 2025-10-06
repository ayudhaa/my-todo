import React from 'react';

const StatsCard = ({ title, value, icon, color, mobile }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500'
  };

  if (mobile) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-2 shadow border border-slate-100 dark:border-slate-600 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className={`text-lg p-2 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white shadow`}>
            {icon}
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">{title}</div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{value}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-4 mb-4 shadow-lg border border-slate-100 dark:border-slate-600">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</div>
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mt-1">{value}</div>
        </div>
        <div className={`text-2xl p-3 rounded-2xl bg-gradient-to-r ${colorClasses[color]} text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;