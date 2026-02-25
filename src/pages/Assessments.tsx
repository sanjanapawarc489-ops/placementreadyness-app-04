import { ClipboardList, Clock, CheckCircle } from 'lucide-react';

export function Assessments() {
  const assessments = [
    { name: 'Technical Assessment 1', duration: '60 min', status: 'Available', questions: 30 },
    { name: 'Aptitude Test', duration: '45 min', status: 'Completed', questions: 50 },
    { name: 'Coding Challenge', duration: '90 min', status: 'Available', questions: 4 },
    { name: 'System Design Interview', duration: '45 min', status: 'Scheduled', questions: 2 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Assessments</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {assessments.map((assessment, index) => (
          <div
            key={assessment.name}
            className={`p-6 flex items-center justify-between ${
              index !== assessments.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{assessment.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {assessment.duration}
                  <span className="mx-2">•</span>
                  {assessment.questions} questions
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {assessment.status === 'Completed' && (
                <span className="flex items-center text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </span>
              )}
              {assessment.status === 'Available' && (
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                  Start
                </button>
              )}
              {assessment.status === 'Scheduled' && (
                <span className="text-gray-500 font-medium">Scheduled</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
