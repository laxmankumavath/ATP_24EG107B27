import { useState } from 'react'

function FormHandler() {
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const validate = (values) => {
    const newErrors = {}
    if (!values.name.trim()) newErrors.name = 'Name is required.'
    if (!values.email.trim()) {
      newErrors.email = 'Email is required.'
    } 
    if (!values.message.trim()) newErrors.message = 'Message is required.'
    return newErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitted(null) 
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validate(formValues)
    if (Object.keys(validation).length) {
      setErrors(validation)
      setSubmitted(null)
      return
    }

    setSubmitted(formValues)
    setFormValues({ name: '', email: '', message: '' })
    setErrors({})
  }

  return (
    <section className="p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-2">
          <span className="font-medium">Name</span>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </label>

        <label className="block mb-2">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </label>

        <label className="block mb-4">
          <span className="font-medium">Message</span>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-semibold">Form submitted successfully!</h3>
          <p>Name: {submitted.name}</p>
          <p>Email: {submitted.email}</p>
          <p>Message: {submitted.message}</p>
        </div>
      )}
    </section>
  )
}

export default FormHandler
