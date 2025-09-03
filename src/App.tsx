import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Layout } from './components/layout/Layout'
import { LoginForm } from './components/auth/LoginForm'
import { SignUpForm } from './components/auth/SignUpForm'
import { Dashboard } from './pages/Dashboard'
import { Jobs } from './pages/Jobs'
import { Schedule } from './pages/Schedule'
import { Estimates } from './pages/Estimates'
import { Communities } from './pages/Communities'
import { Floorplans } from './pages/Floorplans'
import { Materials } from './pages/Materials'
import { Crew } from './pages/Crew'
import { Photos } from './pages/Photos'
import { Reports } from './pages/Reports'

const queryClient = new QueryClient()

function AuthWrapper() {
  const [isSignUp, setIsSignUp] = useState(false)
  const { user, loading, error } = useAuth()

  console.log('🔍 Auth state:', { 
    hasUser: !!user, 
    loading, 
    error,
    userEmail: user?.email 
  })

  // Show error state if there's a critical error
  if (error && !user && error.includes('not configured')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h2>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  // Show loading state only briefly
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading TrueGrit...</p>
          <p className="text-xs text-gray-500 mt-2">Initializing application...</p>
        </div>
      </div>
    )
  }

  // Show auth forms if no user
  if (!user) {
    return isSignUp ? (
      <SignUpForm onToggleMode={() => setIsSignUp(false)} />
    ) : (
      <LoginForm onToggleMode={() => setIsSignUp(true)} />
    )
  }

  // Show main application
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="estimates" element={<Estimates />} />
          <Route path="communities" element={<Communities />} />
          <Route path="floorplans" element={<Floorplans />} />
          <Route path="materials" element={<Materials />} />
          <Route path="crew" element={<Crew />} />
          <Route path="photos" element={<Photos />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthWrapper />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App