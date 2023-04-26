import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

// const Statistics = (props) => {
//   if (parseInt(props.value) === 0) {
//     return (
//       <div>
//         <p>{props.text} No feedback given</p>
//       </div>
//     )
//   } else {
//     return (
//       <p>{props.text} {props.value}</p>
//     );
//   }
// }

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={`${average}%`} />
          <Statistic text="positive" value={`${positive}%`} />
        </tbody>
      </table>
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
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

        {/* <Statistics text="good" value={`${good}`} />
        <Statistics text="neutral" value={`${neutral}`} />
        <Statistics text="bad" value={`${bad}`} />
        <Statistics text="all" value={`${all}`} />
        <Statistics text="average" value={`${average}%`} />
        <Statistics text="positive" value={`${positive}%`} /> */}
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)