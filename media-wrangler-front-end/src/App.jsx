import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReviewForm from './components/ReviewForm/ReviewForm'
import BasicReviewForm from './components/ReviewForm/BasicReviewForm';
import StarRating from './components/Rating/StarRating'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReviewForm />
    
    </>
  )
}

export default App
