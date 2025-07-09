import React from 'react';
import { useParams } from 'react-router-dom';
import News from '../News'; // ✅ Correct if News.js is in src/

function NewsWrapper() {
  const { categoryName } = useParams();
  return <News category={categoryName || 'technology'} />;
}

export default NewsWrapper;
