import React, { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { supabase } from '../lib/supabase'

export function Reports() {
  const [stats, setStats] = useState<any>({})
  const [jobsByMonth, setJobsByMonth] = useState<any[]>([])
  const [jobsByStatus, setJobsByStatus] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      // Fetch overall statistics
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('status, estimated_cost, actual_cost, created_at, work_order_type')

      if (jobsError) throw jobsError

      // Calculate stats
      const totalJobs = jobsData?.length || 0
      const completedJobs = jobsData?.filter(job => job.status === 'completed').length || 0
      const totalRevenue = jobsData?.reduce((sum, job) => sum + (job.actual_cost || job.estimated_cost), 0) || 0
      const avgJobValue = totalJobs > 0 ? totalRevenue / totalJobs : 0

      setStats({
        totalJobs,
        completedJobs,
        totalRevenue,
        avgJobValue,
        completionRate: totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0
      })

      // Process jobs by month
      const monthlyData: { [key: string]: { jobs: number, revenue: number } } = {}
      jobsData?.forEach(job => {
        const month = new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        if (!monthlyData[month]) {
          monthlyData[month] = { jobs: 0, revenue: 0 }
        }
        monthlyData[month].jobs++
        monthlyData[month].revenue += job.actual_cost || job.estimated_cost
      })

      const monthlyArray = Object.entries(monthlyData)
        .map(([month, data]) => ({ month, ...data }))
        .slice(-6)

      setJobsByMonth(monthlyArray)

      // Process jobs by status
      const statusCounts: { [key: string]: number } = {}
      jobsData?.forEach(job => {
        statusCounts[job.status] = (statusCounts[job.status] || 0) + 1
      })

      const statusArray = Object.entries(statusCounts).map(([status, count]) => ({
        status: status.replace('_', ' '),
        count
      }))

      setJobsByStatus(statusArray)
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusColors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']

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
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>

      {/* Key Metrics */}
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
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Job Value</p>
              <p className="text-2xl font-bold text-gray-900">${stats.avgJobValue?.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate?.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Jobs Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs & Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#3B82F6" name="Jobs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Jobs by Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobsByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ status, count }) => `${status}: ${count}`}
              >
                {jobsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={jobsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Crew Productivity</h4>
                <p className="text-sm text-gray-600">Track crew performance and hours</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Profit Analysis</h4>
                <p className="text-sm text-gray-600">Job profitability breakdown</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Schedule Efficiency</h4>
                <p className="text-sm text-gray-600">Timeline and delays analysis</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}