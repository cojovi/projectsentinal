import React, { useEffect, useState } from 'react'
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  FileText
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface DashboardStats {
  totalJobs: number
  completedJobs: number
  inProgressJobs: number
  scheduledJobs: number
  totalRevenue: number
  activeCrew: number
  pendingEstimates: number
}

export function Dashboard() {
  const { profile } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    completedJobs: 0,
    inProgressJobs: 0,
    scheduledJobs: 0,
    totalRevenue: 0,
    activeCrew: 0,
    pendingEstimates: 0,
  })
  const [recentJobs, setRecentJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch job statistics
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('status, estimated_cost, actual_cost')

      if (jobsError) {
        console.error('Error fetching jobs:', jobsError)
        throw jobsError
      }

      // Calculate statistics
      const totalJobs = jobsData?.length || 0
      const completedJobs = jobsData?.filter(job => job.status === 'completed').length || 0
      const inProgressJobs = jobsData?.filter(job => job.status === 'in_progress').length || 0
      const scheduledJobs = jobsData?.filter(job => job.status === 'scheduled').length || 0
      const totalRevenue = jobsData?.reduce((sum, job) => sum + (job.actual_cost || job.estimated_cost), 0) || 0

      // Fetch crew count
      const { data: crewData } = await supabase
        .from('profiles')
        .select('id')
        .in('role', ['crew_lead', 'crew_member'])

      // Fetch pending estimates
      const { data: estimatesData } = await supabase
        .from('estimates')
        .select('id')
        .eq('status', 'draft')

      // Fetch recent jobs
      const { data: recentJobsData } = await supabase
        .from('jobs')
        .select(`
          *,
          communities(name),
          floorplans(name),
          profiles:crew_lead_id(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalJobs,
        completedJobs,
        inProgressJobs,
        scheduledJobs,
        totalRevenue,
        activeCrew: crewData?.length || 0,
        pendingEstimates: estimatesData?.length || 0,
      })

      setRecentJobs(recentJobsData || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'on_hold':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.full_name}
        </h1>
        <p className="text-gray-600">Here's what's happening with your construction projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Crew</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCrew}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{stats.inProgressJobs} on active jobs</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalJobs > 0 ? Math.round((stats.completedJobs / stats.totalJobs) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{stats.completedJobs} of {stats.totalJobs} completed</span>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Jobs</h2>
        </div>
        <div className="p-6">
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No jobs found. Create your first job to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(job.status)}
                    <div>
                      <p className="font-medium text-gray-900">
                        #{job.job_number} - {job.work_order_type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {job.lot_address} • {job.communities?.name}
                      </p>
                      {job.profiles?.full_name && (
                        <p className="text-xs text-gray-500">
                          Lead: {job.profiles.full_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(job.status)}`}>
                      {job.status.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      ${job.estimated_cost.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}