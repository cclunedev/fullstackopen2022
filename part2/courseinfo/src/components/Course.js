const Header = (props) => {
  return(
    <h1>{props.course.name}</h1>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {return s + p.exercises}, 0)

  return(
    <p><b>total of {total} exercises</b></p>
  )
}

const Content = ({course}) => {
  return(
  <div>
      {course.parts.map(parts=>
        <Part key={parts.id} name={parts.name} exercises={parts.exercises} />
      )}
  <Total parts={course.parts} />
  </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header course={course} />
    
    <Content course ={course} />
    </div>
    
  )
}

export default Course