import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<div className="glass-card" style={{ padding: '2rem' }}>Users Page Placeholder</div>} />
          <Route path="analytics" element={<div className="glass-card" style={{ padding: '2rem' }}>Analytics Page Placeholder</div>} />
          <Route path="projects" element={<div className="glass-card" style={{ padding: '2rem' }}>Projects Page Placeholder</div>} />
          <Route path="notifications" element={<div className="glass-card" style={{ padding: '2rem' }}>Notifications Page Placeholder</div>} />
          <Route path="settings" element={<div className="glass-card" style={{ padding: '2rem' }}>Settings Page Placeholder</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
