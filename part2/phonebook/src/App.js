import { useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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