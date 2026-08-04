import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import Header from './Components/Header/header'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import ProtectedRoute from './Components/ProtectedRoute';
import Projects from './Components/Form/Projects';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/builder" element={
            <ProtectedRoute><Builder /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App