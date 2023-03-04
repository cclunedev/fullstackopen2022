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

const QueryResults = ({matchingCountries}) => {
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
        <MultipleMatch country={country} key={country.name.common}/>)}
      </div>
    )
  }
  
  else if (matchingCountries.length = 1) {
    return (
      <div>
        {matchingCountries.map(country =>
        <CountryDetails country={country} key={country.name.common} />)}
      </div>
    )
  }
}

const MultipleMatch = ({country}) => {
  return(
    <p>
      {country.name.common}
    </p>
  )
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

const App = () => {
  const [countries, setCountries] = useState(null)
  const [query, setQuery] = useState('')
  const [matchingCountries, setMatchingCountries] = useState(null)

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
        return country.name.common.toLowerCase().startsWith(query.toLowerCase())
      })
    )
        
  }, [query])



  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
    <Search query={query} handleQueryChange={handleQueryChange} />
    <QueryResults matchingCountries={matchingCountries} />
    </div>
  )
}

export default App