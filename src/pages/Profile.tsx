import { User, Mail, Award, Calendar } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
      
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mr-6">
            <User className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
            <p className="text-gray-500">Computer Science Student</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <p className="text-gray-900">john.doe@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Member Since
            </label>
            <p className="text-gray-900">January 2024</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Award className="w-4 h-4 inline mr-2" />
              Rank
            </label>
            <p className="text-gray-900">Advanced</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problems Solved
            </label>
            <p className="text-gray-900">124</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'Python', 'React', 'Node.js', 'Data Structures', 'Algorithms'].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-primary-50 text-primary rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
