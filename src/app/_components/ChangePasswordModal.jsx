"use client"
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import CHANGE_PASSWORD_MUTATION from '@/app/_mutations/changePassword'

export default function ChangePasswordModal({ userId, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION)
  const [cookies] = useCookies(['token'])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setSuccess(false)
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match')
      return
    }
    try {
      const { data } = await changePassword({
        variables: {
          id: userId,
          currentPassword,
          newPassword
        }
      })
      setMessage(data.changePassword.message)
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setMessage(err.message)
      setSuccess(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Change Admin Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Current Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">New Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">Confirm New Password</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          {message && <div className={success ? "mb-2 text-green-600 text-center" : "mb-2 text-red-500 text-center"}>{message}</div>}
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" disabled={loading}>{loading ? 'Changing...' : 'Change Password'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
