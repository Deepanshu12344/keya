import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Dashboard} from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#fff8f1]">
      <BrowserRouter>
        <Navbar />

        <main className="pt-16 px-4"> {/* pt-16 = 4rem = height of navbar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
