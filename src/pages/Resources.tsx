import { BookOpen, FileText, Video, ExternalLink } from 'lucide-react';

export function Resources() {
  const resources = [
    {
      category: 'Study Guides',
      items: [
        { title: 'Data Structures Cheat Sheet', type: 'PDF', icon: FileText },
        { title: 'Algorithm Complexity Guide', type: 'PDF', icon: FileText },
        { title: 'System Design Primer', type: 'Article', icon: BookOpen },
      ],
    },
    {
      category: 'Video Tutorials',
      items: [
        { title: 'Introduction to Dynamic Programming', type: 'Video', icon: Video },
        { title: 'Binary Tree Traversals Explained', type: 'Video', icon: Video },
        { title: 'Mock Interview: Frontend Engineer', type: 'Video', icon: Video },
      ],
    },
    {
      category: 'External Links',
      items: [
        { title: 'Company Interview Experiences', type: 'Link', icon: ExternalLink },
        { title: 'Salary Negotiation Guide', type: 'Link', icon: ExternalLink },
        { title: 'Resume Building Tips', type: 'Link', icon: ExternalLink },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {resources.map((section) => (
          <div key={section.category} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.category}</h3>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <item.icon className="w-5 h-5 text-primary mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
