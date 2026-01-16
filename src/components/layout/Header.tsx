import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Settings, LogOut, User } from 'lucide-react'
import { ProfileEditModal } from '../modals/ProfileEditModal'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { profile, signOut } = useAuth()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const navigate = useNavigate()

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'NU'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">TrueGrit Construction</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/settings')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Profile"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {getInitials(profile?.full_name)}
              </div>
              <span className="text-gray-700 font-medium">
                {profile?.full_name || 'New User'}
              </span>
            </button>

            <button
              onClick={handleSignOut}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {showProfileModal && (
        <ProfileEditModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  )
}