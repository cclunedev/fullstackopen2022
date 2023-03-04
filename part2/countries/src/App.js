import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({query, handleQueryChange}) => {
  return(
    <div>
      <form>
        find countries: 
        <input value={query}
        onChange={handleQueryChange} />
      </form>
    </div>
  )
}

const QueryResults = ({matchingCountries, handleShowDetailsClick, showDetailsCountries}) => {
  if (matchingCountries === null) {
    return (
      null
    )
  }


  else if (matchingCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  else if (matchingCountries.length > 1) {
    return (
      <div>
        {matchingCountries.map(country =>
        <MultipleMatch country={country} key={country.name.common} handleShowDetailsClick ={handleShowDetailsClick} showDetailsCountries={showDetailsCountries}/>)}
      </div>
    )
  }
  
  else if (matchingCountries.length = 1) {
    return (
      <div>
        {matchingCountries.map(country =>
        <CountryDetails country={country} key={country.name.common}/>)}
        {matchingCountries.map(country =>
        <Weather country={country} key={country.name.common}/>)}
      </div>
    )
  }
}

const MultipleMatch = ({country, handleShowDetailsClick, showDetailsCountries}) => {
  if (showDetailsCountries.includes(country.name.common)) {
    return(
      <div>
        <p>
          {country.name.common} <button id={country.name.common} onClick={handleShowDetailsClick}>Hide Details</button>
        </p>
        <CountryDetails country={country} key={country.name.common}/>
      </div>
    )
  }
  
  else {
  return(
    <p>
      {country.name.common} <button id={country.name.common} onClick={handleShowDetailsClick}>Show Details</button>
    </p>
  )
  }
}

const CountryDetails = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <Languages languages={country.languages} />
      <Flag country={country} />
    </div>
  )
}

const Languages = ({languages}) => {
  return(
    <div>
      <h2>languages:</h2>
      <ul>
      {Object.entries(languages).map(([key, value]) => 
      <li key={key}>{value}</li> )}
      </ul>
    </div>
  )
}

const Flag = ({country}) => {
  return (
    <img src={country.flags.png} alt={country.flags.alt}></img>
  )
}

const Weather = ({country}) => {
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [matchingCountries, setMatchingCountries] = useState(null)
  const [showDetailsCountries, setShowDetailsCountries] = useState([])

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  useEffect(() => {
    setMatchingCountries(
      countries.filter(country => {
        return country.name.common.toLowerCase().includes(query.toLowerCase())
      })
    )
        
  }, [query])



  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShowDetailsClick = (event) => {
    if (!showDetailsCountries.includes(event.target.id)) {
      setShowDetailsCountries(showDetailsCountries.concat(event.target.id))
    }
    else {
      setShowDetailsCountries(showDetailsCountries.filter(word => word != event.target.id))
    }
  }

  return (
    <div>
    <Search query={query} handleQueryChange={handleQueryChange} />
    <QueryResults matchingCountries={matchingCountries} handleShowDetailsClick={handleShowDetailsClick} showDetailsCountries={showDetailsCountries} />
    </div>
  )
}

export default App