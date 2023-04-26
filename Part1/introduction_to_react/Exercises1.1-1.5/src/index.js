import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  const formartAverage = (votes) => {
    return props.all === 0 ? 0 : ((votes / props.all) * 100).toFixed(2)
  }

  const average = formartAverage(props.bad);
  const positive = formartAverage(props.good);

  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {average}%</p>
      <p>positive {positive}%</p>
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

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
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)