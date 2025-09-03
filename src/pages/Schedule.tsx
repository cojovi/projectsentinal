import React, { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'

export function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    fetchJobs()
  }, [currentDate])

  const fetchJobs = async () => {
    try {
      const startDate = startOfMonth(currentDate)
      const endDate = endOfMonth(currentDate)

      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          communities(name),
          profiles:crew_lead_id(full_name)
        `)
        .gte('estimated_start_date', format(startDate, 'yyyy-MM-dd'))
        .lte('estimated_start_date', format(endDate, 'yyyy-MM-dd'))
        .order('estimated_start_date')

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  const getJobsForDate = (date: Date) => {
    return jobs.filter(job => 
      isSameDay(new Date(job.estimated_start_date), date)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in_progress':
        return 'bg-yellow-500'
      case 'scheduled':
        return 'bg-blue-500'
      case 'on_hold':
        return 'bg-gray-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Schedule Job
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map(date => {
            const dayJobs = getJobsForDate(date)
            const isToday = isSameDay(date, new Date())
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            return (
              <div
                key={date.toISOString()}
                className={`min-h-[100px] p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isToday ? 'bg-blue-50 border-blue-200' : ''
                } ${
                  isSelected ? 'bg-blue-100 border-blue-300' : ''
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {format(date, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayJobs.slice(0, 3).map(job => (
                    <div
                      key={job.id}
                      className={`text-xs p-1 rounded text-white truncate ${getStatusColor(job.status)}`}
                      title={`${job.job_number} - ${job.work_order_type}`}
                    >
                      #{job.job_number}
                    </div>
                  ))}
                  {dayJobs.length > 3 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{dayJobs.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Scheduled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span>On Hold</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Cancelled</span>
          </div>
        </div>
      </div>

      {/* Selected Date Jobs */}
      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Jobs for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          
          {getJobsForDate(selectedDate).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No jobs scheduled for this date</p>
          ) : (
            <div className="space-y-3">
              {getJobsForDate(selectedDate).map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
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
                    <p className="text-sm font-medium text-gray-900">
                      ${job.estimated_cost.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {job.priority} priority
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}