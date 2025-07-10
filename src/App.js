import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsWrapper from './components/NewsWrapper';

export default function App() {
  return (
    <BrowserRouter basename="/V-react-code-newsapp">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/newsapp" />} />
        <Route path="/newsapp" element={<NewsWrapper category="general" />} />
        <Route path="/category/:categoryName" element={<NewsWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
