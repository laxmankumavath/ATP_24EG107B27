import { useState } from 'react'

function Form() {
  const [formData, setFormData] = useState({ name: '', email: '', dob: '' })
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email must be valid.'
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required.'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setUsers(prev => [...prev, { ...formData, id: Date.now() }])
    setFormData({ name: '', email: '', dob: '' })
  }

  return (
    <div className="min-h-screen bg-blue-500 p-4">
      <div className="max-w-md mx-auto bg-orange-400 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">User Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </form>
      </div>
      <div className="max-w-md mx-auto mt-8 bg-red-500 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2 text-center">Users List</h3>
        {users.length === 0 ? (
          <p className="text-center">No users added yet.</p>
        ) : (
          <ul className="space-y-2">
            {users.map(user => (
              <li key={user.id} className="bg-white p-2 rounded shadow">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>DOB:</strong> {user.dob}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Form
