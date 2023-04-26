import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  if (parseInt(props.value) === 0) {
    return (
      <div>
        <p>{props.text} No feedback given</p>
      </div>
    )
  } else {
    return (
      <p>{props.text} {props.value}</p>
    );
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const formartAverage = (votes) => {
    return all === 0 ? 0 : ((votes / all) * 100).toFixed(2)
  }

  const average = formartAverage(bad);
  const positive = formartAverage(good);
  
  const handleGoodVoteClick = () => {
    setGood(good + 1);
    setAll(all + 1);
  }
  const handleNeutralVoteClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }
  const handleBadVoteClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <div>
        <h1>give feddBack</h1>
        <Button handleClick={handleGoodVoteClick} text="good" />
        <Button handleClick={handleNeutralVoteClick} text="neutral" />
        <Button handleClick={handleBadVoteClick} text="bad" />
        <h1>statistics</h1>
        <Statistics text="good" value={`${good}`} />
        <Statistics text="neutral" value={`${neutral}`} />
        <Statistics text="bad" value={`${bad}`} />
        <Statistics text="all" value={`${all}`} />
        <Statistics text="average" value={`${average}%`} />
        <Statistics text="positive" value={`${positive}%`} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)