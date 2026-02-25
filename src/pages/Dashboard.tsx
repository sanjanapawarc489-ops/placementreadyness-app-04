import { TrendingUp, Target, Award, Clock } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Problems Solved', value: '124', icon: Target, color: 'bg-blue-100 text-blue-600' },
    { label: 'Mock Interviews', value: '8', icon: Award, color: 'bg-green-100 text-green-600' },
    { label: 'Study Hours', value: '42', icon: Clock, color: 'bg-purple-100 text-purple-600' },
    { label: 'Current Streak', value: '15 days', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <p className="text-gray-500">Your recent practice sessions will appear here.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Practice</h3>
          <p className="text-gray-500">Personalized recommendations based on your progress.</p>
        </div>
      </div>
    </div>
  );
}
