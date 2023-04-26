import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const formartAverage = (votes) => {
    return all === 0 ? 0 : ((votes / all)*100).toFixed(2)
  }
  const average = formartAverage(bad);
  const positive = formartAverage(good);

  return (
    <div>
      <div>
        <h1>give feddBack</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}%</p>
        <p>positive {positive}%</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)