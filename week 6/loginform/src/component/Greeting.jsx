function Greeting({ name = 'Guest' }) {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold">Welcome, {name}!</h1>
      <p className="text-sm text-gray-600">This is a reusable component.</p>
    </div>
  )
}

export default Greeting
