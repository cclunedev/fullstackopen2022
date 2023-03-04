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

const QueryResults = ({matchingCountries, handleShowDetailsClick, showDetailsCountries, weather}) => {
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
        <Weather country={country} key={country.name.common} weather={weather}/>)}
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

const Weather = ({country, weather}) => {
  if (weather) {  
    const imageSource = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return(
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={imageSource}></img>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [matchingCountries, setMatchingCountries] = useState(null)
  const [showDetailsCountries, setShowDetailsCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  useEffect(() => {
    if (countries) {
      if (query) {
      setMatchingCountries(
          countries.filter(country => {
            return country.name.common.toLowerCase().includes(query.toLowerCase())
          })
        )
      }   
    }     
  }, [query])

  useEffect(() => {
    if (matchingCountries) {
      if (matchingCountries[0] && matchingCountries.length == 1) {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${matchingCountries[0].capital}&units=metric&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
      }
    }
  }, [matchingCountries])

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
    <QueryResults matchingCountries={matchingCountries} handleShowDetailsClick={handleShowDetailsClick} showDetailsCountries={showDetailsCountries} weather={weather}/>
    </div>
  )
}

export default App