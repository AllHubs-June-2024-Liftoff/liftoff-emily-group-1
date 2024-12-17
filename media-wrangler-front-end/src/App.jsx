import { useState } from 'react'

import './App.css'
import ReviewForm from './components/ReviewForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ReviewForm />
    </>
  )
}

export default App
