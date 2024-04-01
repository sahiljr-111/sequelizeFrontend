import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AddStud from './pages/AddStud';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudentDetails from './pages/StudentDetails';
import BookDetails from './pages/BookDetails';
import EditStud from './pages/EditStud';
const queryClient = new QueryClient()


const root = (ReactDOM as any).createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/add-students' element={<AddStud />} />
          <Route path='/student/:id' element={<StudentDetails />} />
          <Route path='/student-edit/:id' element={<EditStud />} />
          <Route path='/book/:id' element={<BookDetails />} />
        </Route>
        <Route path='/login' element={<AdminLogin />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

reportWebVitals();
