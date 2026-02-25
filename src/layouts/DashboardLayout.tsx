import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardList, Library, User, GraduationCap } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/practice', label: 'Practice', icon: BookOpen },
  { path: '/assessments', label: 'Assessments', icon: ClipboardList },
  { path: '/resources', label: 'Resources', icon: Library },
  { path: '/profile', label: 'Profile', icon: User },
];

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <GraduationCap className="w-8 h-8 text-primary mr-3" />
          <span className="text-xl font-bold text-gray-900">Placement Prep</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-900">Placement Prep</h2>
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
