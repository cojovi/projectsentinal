import React, { useEffect, useState } from 'react'
import { Plus, Users, Mail, Phone, Crown, UserCheck, Edit, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function Crew() {
  const { profile, user, updateUserRole } = useAuth()
  const [crew, setCrew] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchCrew()
  }, [])

  const fetchCrew = async () => {
    try {
      // Fetch from admin_profiles first, then regular profiles
      const { data: adminProfiles, error: adminError } = await supabase
        .from('admin_profiles')
        .select(`
          *,
          crew_assignments(id, job_id, jobs(job_number, status))
        `)
        .order('full_name')

      const { data: regularProfiles, error: profileError } = await supabase
        .from('profiles')
        .select(`
          *,
          crew_assignments(id, job_id, jobs(job_number, status))
        `)
        .order('full_name')

      // Combine both results, prioritizing admin_profiles
      let allProfiles = []
      
      if (adminProfiles && adminProfiles.length > 0) {
        allProfiles = [...adminProfiles]
      }
      
      if (regularProfiles && regularProfiles.length > 0) {
        // Add regular profiles that don't already exist in admin_profiles
        const adminIds = new Set(adminProfiles?.map(p => p.id) || [])
        const uniqueRegularProfiles = regularProfiles.filter(p => !adminIds.has(p.id))
        allProfiles = [...allProfiles, ...uniqueRegularProfiles]
      }

      setCrew(allProfiles)
    } catch (error) {
      console.error('Error fetching crew:', error)
      setCrew([])
    } finally {
      setLoading(false)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-purple-600" />
      case 'manager':
        return <UserCheck className="h-4 w-4 text-blue-600" />
      case 'crew_lead':
        return <Users className="h-4 w-4 text-green-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'manager':
        return 'bg-blue-100 text-blue-800'
      case 'crew_lead':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isAdmin = profile?.is_admin === true || 
                  profile?.role === 'admin' || 
                  profile?.role === 'manager' ||
                  (user as any)?.app_metadata?.role === 'admin'
  
  const canManage = isAdmin
  const canCreateCrew = isAdmin

  const handlePromoteToAdmin = async (userId: string) => {
    if (confirm('Are you sure you want to promote this user to admin? This will give them full system access.')) {
      try {
        const result = await updateUserRole(userId, 'admin')
        
        if (result.success) {
          alert('User promoted to admin successfully!')
          fetchCrew() // Refresh the crew list
        } else {
          alert(`Failed to promote user: ${result.error}`)
        }
      } catch (error) {
        console.error('Error promoting user:', error)
        alert('Failed to promote user. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Crew Management</h1>
        {canCreateCrew && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Crew Member
          </button>
        )}
      </div>

      {crew.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No crew members found</h3>
          <p className="text-gray-600 mb-4">
            Add crew members to manage assignments and track productivity.
          </p>
          {canCreateCrew && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add First Member
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crew.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {member.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.full_name}</h3>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(member.role)}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColor(member.role)}`}>
                        {member.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                {canManage && member.id !== profile?.id && (
                  <div className="flex space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Jobs:</span>
                  <span className="font-medium text-gray-900">
                    {member.crew_assignments?.filter((assignment: any) => 
                      assignment.jobs?.status === 'in_progress' || assignment.jobs?.status === 'scheduled'
                    ).length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(member.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Promote to Admin Button */}
                {canManage && member.role !== 'admin' && member.id !== profile?.id && (
                  <div className="mt-3">
                    <button
                      onClick={() => handlePromoteToAdmin(member.id)}
                      className="w-full text-xs px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                    >
                      Promote to Admin
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateCrewMemberModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchCrew()
          }}
        />
      )}
    </div>
  )
}

function CreateCrewMemberModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'crew_member'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create profile directly (demo mode)
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: crypto.randomUUID(),
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          phone: formData.phone || null,
        })
      
      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error creating crew member:', error)
      alert('Failed to create crew member. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Crew Member</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="crew_member">Crew Member</option>
              <option value="crew_lead">Crew Lead</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}