import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  

  const addPerson = (event) => {
    event.preventDefault()

    //Determine if newName is currently in persons
    let personsNames = []
    persons.forEach(persons => personsNames.push(persons.name))
    
    const nameInPersons = personsNames.includes(newName)

    //If name is unique
    if (!nameInPersons) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

    //Otherwise throw error
    else {
      window.alert(`${newName} is already added to phonebook`)
    }

  }

  const [nameFilter, setNameFilter] = useState('')
  
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const namesToShow = (nameFilter == "") 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Filter</h3>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Numbers namesToShow={namesToShow} />
    </div>
  )
}

export default App