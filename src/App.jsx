import { useState } from 'react'
import  FeatureShowcase from "./components/FeatureShowcase";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<main>
      <FeatureShowcase />
    </main>
  )
}

export default App
