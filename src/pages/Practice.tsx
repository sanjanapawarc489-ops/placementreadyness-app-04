import { Code } from 'lucide-react';

export function Practice() {
  const categories = [
    { name: 'Arrays & Strings', count: 45, difficulty: 'Easy to Hard' },
    { name: 'Linked Lists', count: 25, difficulty: 'Medium' },
    { name: 'Trees & Graphs', count: 35, difficulty: 'Medium to Hard' },
    { name: 'Dynamic Programming', count: 30, difficulty: 'Hard' },
    { name: 'System Design', count: 15, difficulty: 'Advanced' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Practice Problems</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-2">{category.count} problems</p>
            <p className="text-gray-400 text-sm">{category.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
