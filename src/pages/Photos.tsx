import React, { useEffect, useState } from 'react'
import { Camera, Upload, Eye, Download, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function Photos() {
  const { profile } = useAuth()
  const [photos, setPhotos] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)

  useEffect(() => {
    fetchPhotos()
    fetchJobs()
  }, [selectedJob])

  const fetchPhotos = async () => {
    try {
      let query = supabase
        .from('job_photos')
        .select(`
          *,
          jobs(job_number, lot_address, work_order_type, communities(name)),
          profiles:taken_by(full_name)
        `)
        .order('taken_at', { ascending: false })

      if (selectedJob !== 'all') {
        query = query.eq('job_id', selectedJob)
      }

      const { data, error } = await query

      if (error) throw error
      setPhotos(data || [])
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          communities(name)
        `)
        .order('job_number', { ascending: false })

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Job Photos</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Upload Photos
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by Job:</span>
        </div>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Jobs</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              #{job.job_number} - {job.work_order_type}
            </option>
          ))}
        </select>
      </div>

      {photos.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600 mb-4">
            {selectedJob !== 'all' 
              ? 'No photos have been uploaded for this job yet.'
              : 'Upload photos to document job progress and completion.'
            }
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={photo.photo_url}
                  alt={photo.caption || 'Job photo'}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button className="p-1.5 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 text-sm">
                    #{photo.jobs?.job_number} - {photo.jobs?.work_order_type}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {photo.jobs?.lot_address} • {photo.jobs?.communities?.name}
                  </p>
                </div>

                {photo.caption && (
                  <p className="text-sm text-gray-700 mb-3">{photo.caption}</p>
                )}

                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Taken by:</span>
                    <span>{photo.profiles?.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(photo.taken_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{new Date(photo.taken_at).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <UploadPhotoModal
          jobs={jobs}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false)
            fetchPhotos()
          }}
        />
      )}
    </div>
  )
}

function UploadPhotoModal({ 
  jobs, 
  onClose, 
  onSuccess 
}: {
  jobs: any[]
  onClose: () => void
  onSuccess: () => void
}) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    jobId: '',
    photoUrl: '',
    caption: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('job_photos')
        .insert({
          job_id: formData.jobId,
          photo_url: formData.photoUrl,
          caption: formData.caption || null,
          taken_by: user?.id,
          taken_at: new Date().toISOString(),
        })

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Job Photo</h2>

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
              Photo URL *
            </label>
            <input
              type="url"
              required
              value={formData.photoUrl}
              onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://images.pexels.com/photos/example.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              For demo purposes, use image URLs from Pexels or other image hosting services
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption
            </label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({...formData, caption: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe what's shown in this photo..."
            />
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
              {loading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}