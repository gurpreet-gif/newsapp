import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsWrapper from './components/NewsWrapper';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter basename="/newsapp">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/category/general" />} />
        <Route path="/category/:categoryName" element={<NewsWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
