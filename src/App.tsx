import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Practice } from './pages/Practice';
import { Assessments } from './pages/Assessments';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { JDInput } from './pages/JDInput';
import { Results } from './pages/Results';
import { History } from './pages/History';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analyze" element={<JDInput />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
