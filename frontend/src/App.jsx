import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SymptomChecker from './pages/SymptomChecker'
import Dashboard from './pages/DashBoard'
import DoctorFind from './pages/DoctorFind'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/checker" element={
          <ProtectedRoute>
            <SymptomChecker/>
          </ProtectedRoute>
        }/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/doctorFind" element={
          <ProtectedRoute>
            <DoctorFind/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App