import { useEffect, useState } from 'react'
import './App.css'

interface animal {
  id: number,
  type: string,
  age: number,
  name: string
}


function useAnimalSearch() {
  const [animals, setAnimals] = useState<animal[]>([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    lastQuery ? search(lastQuery) : null
    
  }, [])


  const search = async (q: string) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }))
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q)
  };

  return {search, animals}
}


function Animal( {type, name, age} : animal ){
  return(
    <li>
    <strong>{type}</strong> {name} ({age} years old)
  </li>
  )
}

function App() {
  const {search, animals} = useAnimalSearch();
  return (
    <div className='App'>
      <h1>Fetching App</h1>
      <input 
      type='text'
      placeholder='Search'
      onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((a : animal) => (
          <Animal key={a.id} {...a} />
        ))}
        {animals.length == 0 && 'No Animals Found.'}
      </ul>
    </div>
  )
}

export default App
