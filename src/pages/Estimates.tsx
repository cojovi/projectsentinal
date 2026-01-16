import React, { useEffect, useState } from 'react'
import { Plus, DollarSign, FileText, Send, Eye, Edit } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function Estimates() {
  const { profile, user } = useAuth()
  const [estimates, setEstimates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchEstimates()
  }, [])

  const fetchEstimates = async () => {
    try {
      const { data, error } = await supabase
        .from('estimates')
        .select(`
          *,
          jobs(job_number, lot_address, work_order_type, communities(name)),
          profiles:created_by(full_name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEstimates(data || [])
    } catch (error) {
      console.error('Error fetching estimates:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'sent':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isAdmin = profile?.is_admin === true || 
                  profile?.role === 'admin' || 
                  profile?.role === 'manager' ||
                  (user as any)?.app_metadata?.role === 'admin'
  
  const canManage = isAdmin

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Estimates</h1>
        {canManage && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Estimate
          </button>
        )}
      </div>

      {/* Estimates List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {estimates.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No estimates found</h3>
            <p className="text-gray-600 mb-4">
              Create your first estimate to start quoting jobs for clients.
            </p>
            {canManage && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create First Estimate
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {estimates.map((estimate) => (
              <div key={estimate.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        #{estimate.estimate_number}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(estimate.status)}`}>
                        {estimate.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium">Job: #{estimate.jobs?.job_number} - {estimate.jobs?.work_order_type}</p>
                      <p>{estimate.jobs?.lot_address} • {estimate.jobs?.communities?.name}</p>
                      <p>Created by: {estimate.profiles?.full_name}</p>
                      <p>Created: {new Date(estimate.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-gray-900">
                        ${estimate.final_price.toLocaleString()}
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Labor: ${estimate.total_labor_cost.toLocaleString()}</p>
                        <p>Materials: ${estimate.total_material_cost.toLocaleString()}</p>
                        <p>Margin: {estimate.profit_margin}%</p>
                      </div>
                    </div>

                    {canManage && (
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        {estimate.status === 'draft' && (
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Send className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateEstimateModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchEstimates()
          }}
        />
      )}
    </div>
  )
}

function CreateEstimateModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<any[]>([])
  const [formData, setFormData] = useState({
    jobId: '',
    estimateNumber: '',
    totalLaborCost: '',
    totalMaterialCost: '',
    profitMargin: '15',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          communities(name),
          estimates(id)
        `)
        .eq('status', 'scheduled')
        .order('created_at', { ascending: false })

      if (error) throw error
      // Filter out jobs that already have estimates
      const jobsWithoutEstimates = data?.filter(job => job.estimates?.length === 0) || []
      setJobs(jobsWithoutEstimates)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const calculateFinalPrice = () => {
    const laborCost = parseFloat(formData.totalLaborCost) || 0
    const materialCost = parseFloat(formData.totalMaterialCost) || 0
    const margin = parseFloat(formData.profitMargin) || 0
    const subtotal = laborCost + materialCost
    return subtotal * (1 + margin / 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const finalPrice = calculateFinalPrice()

      const { error } = await supabase
        .from('estimates')
        .insert({
          job_id: formData.jobId,
          estimate_number: formData.estimateNumber,
          line_items: [],
          total_labor_cost: parseFloat(formData.totalLaborCost),
          total_material_cost: parseFloat(formData.totalMaterialCost),
          profit_margin: parseFloat(formData.profitMargin),
          final_price: finalPrice,
          created_by: user?.id,
        })

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error creating estimate:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Estimate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job *
            </label>
            <select
              required
              value={formData.jobId}
              onChange={(e) => setFormData({...formData, jobId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Job</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  #{job.job_number} - {job.work_order_type} ({job.communities?.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimate Number *
            </label>
            <input
              type="text"
              required
              value={formData.estimateNumber}
              onChange={(e) => setFormData({...formData, estimateNumber: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="EST-2025-001"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Labor Cost *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.totalLaborCost}
                  onChange={(e) => setFormData({...formData, totalLaborCost: e.target.value})}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="2500.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Material Cost *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.totalMaterialCost}
                  onChange={(e) => setFormData({...formData, totalMaterialCost: e.target.value})}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1500.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profit Margin (%) *
            </label>
            <input
              type="number"
              required
              min="0"
              max="100"
              step="0.1"
              value={formData.profitMargin}
              onChange={(e) => setFormData({...formData, profitMargin: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="15.0"
            />
          </div>

          {/* Estimate Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900 mb-2">Estimate Summary</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Labor Cost:</span>
                <span>${(parseFloat(formData.totalLaborCost) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Material Cost:</span>
                <span>${(parseFloat(formData.totalMaterialCost) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${((parseFloat(formData.totalLaborCost) || 0) + (parseFloat(formData.totalMaterialCost) || 0)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Profit ({formData.profitMargin}%):</span>
                <span>${(((parseFloat(formData.totalLaborCost) || 0) + (parseFloat(formData.totalMaterialCost) || 0)) * (parseFloat(formData.profitMargin) || 0) / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span>Final Price:</span>
                <span>${calculateFinalPrice().toLocaleString()}</span>
              </div>
            </div>
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
              {loading ? 'Creating...' : 'Create Estimate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}