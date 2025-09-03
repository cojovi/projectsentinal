import React from 'react'
import { Bell, Search, User, LogOut, Edit } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function Header() {
  const { profile, signOut } = useAuth()

  const [showProfileModal, setShowProfileModal] = React.useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, communities..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {profile?.full_name || 'New User'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {profile?.role ? profile.role.replace('_', ' ') : 'crew member'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowProfileModal(true)}
                className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <span className="text-white font-medium text-sm">
                  {profile?.full_name && profile.full_name !== 'New User' ? 
                    profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                    'NU'
                  }
                </span>
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <ProfileEditModal
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </header>
  )
}