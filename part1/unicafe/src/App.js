import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (!(props.good || props.neutral || props.bad)) {
    return (
      <p>No feedback given</p>
    )
  }
  
  else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="avgerage"
            value={((props.good * 1) + (props.bad * -1)) / 
            (props.good + props.neutral + props.bad)} />
          <StatisticLine text="good" value={props.good / 
            (props.good + props.neutral + props.bad)} />
        </tbody>
      </table>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
    <h1>give feedback</h1>
    <Button onClick={increaseGood} text="good" />
    <Button onClick={increaseNeutral} text="neutral" />
    <Button onClick={increaseBad} text="bad" />

    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App