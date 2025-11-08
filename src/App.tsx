import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import TaskManager from './components/TaskManager';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TaskManager />
              <Link to="/about" className="floating-about-btn" aria-label="About">
                <Info size={20} />
              </Link>
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
