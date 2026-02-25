import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges across multiple difficulty levels',
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with AI feedback',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
