import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [flags, setFlags] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  useEffect(() => {
    async function getCountryFlags() {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all')

        const sortFlagsAlphabetical = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

        setFlags(sortFlagsAlphabetical)
      } catch (error) {
        console.log(error);

      }
    }
    getCountryFlags()
  }, [])

  function handleAutoSearch(event) {
    setSearchInput(event.target.value)
  }

  function handleDropDown(event) {
    setSelectedRegion(event.target.value)
  }

  const filteredFlags = flags.filter(
    flag => flag.name.common.toLowerCase().includes(searchInput.toLowerCase()) && 
           (selectedRegion === '' || flag.region === selectedRegion)
  )

  return (
    <>

    <section className='nav'>
      <form id="search-bar">
        <input type="search" name="search" id="search" placeholder='Search...' value={searchInput} onChange={handleAutoSearch} />
      </form>
      <div className="dropdown">
        <select name="areas" id="areas" value={selectedRegion} onChange={handleDropDown}>
          <option value="" >All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
      <h1>Country Flags</h1>
      <section className='flag-section'>
        <div className="container">
          {filteredFlags.length > 0 && filteredFlags.map ((flag, index) => (
            <div className="flagCard" key={index}>
              <h2>{flag.name.common}</h2>
              <p><span className='label'>Capital:</span> {flag.capital}</p>
              <img className='flag-image' src={flag.flags.svg} alt={`Flag of ${flag.name.common}`} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
