import React from 'react'
import {
  Home,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Package,
  Camera,
  Building2,
  Map,
  BarChart3,
  Settings
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Jobs', href: '/jobs', icon: FileText },
  { name: 'Estimates', href: '/estimates', icon: DollarSign },
  { name: 'Communities', href: '/communities', icon: Building2 },
  { name: 'Floorplans', href: '/floorplans', icon: Map },
  { name: 'Materials', href: '/materials', icon: Package },
  { name: 'Crew', href: '/crew', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Photos', href: '/photos', icon: Camera },
]

const adminNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()
  const { profile } = useAuth()

  const { user } = useAuth()
  const isAdmin = profile?.is_admin === true || 
                  profile?.role === 'admin' || 
                  profile?.role === 'manager' ||
                  (user as any)?.app_metadata?.role === 'admin'

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center h-16 px-6 bg-gray-800">
        <Building2 className="h-8 w-8" />
        <span className="ml-3 text-xl font-bold">TrueGrit</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <hr className="my-4 border-gray-700" />
            {adminNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>
    </div>
  )
}