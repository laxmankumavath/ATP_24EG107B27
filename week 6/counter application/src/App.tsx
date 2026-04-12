import { useState } from 'react'
import './App.css'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ backgroundColor: 'orange', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
      <h2>Count: {count}</h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={() => setCount(count + 1)}>+</button>
        <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }} onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div style={{ backgroundColor: 'pink', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <Counter />
        <Counter />
        <Counter />
        <Counter />
      </div>
    </div>
  )
}
 
export default App
// it creates unesceey rendering issues when multiple state is part of the content to overcome the uneccsary rendaring issuee create multiple contexxt and make sure 
// when the application size is hude then maintainance of multiple context will become  aanissue for such large appliations advanced state managements toools redu=x and justand can be used