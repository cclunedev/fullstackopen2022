const Numbers = ({namesToShow}) => {
    return(
      <div>
      {namesToShow.map(person =>
      <Person key={person.id} person={person} />)}
      </div>
    )
  }
const Person = ({person}) => {
    return(
        <p key={person.id}>{person.name}     {person.number}</p>
    )
}

export default Numbers