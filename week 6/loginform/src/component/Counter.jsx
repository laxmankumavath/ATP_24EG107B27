import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Counter</h2>
      <div className="text-4xl font-mono text-center mb-6">{count}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
        >
          Increase
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Decrease
        </button>
      </div>
    </div>
  )
}

export default Counter