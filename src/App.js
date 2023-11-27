import React from 'react';
import './App.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogPost from './components/BlogPost';
import BlogForm from './components/BlogForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogPost />} />
        <Route path="/add-blog" element={<BlogForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;