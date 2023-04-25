import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <p> {props.name} {props.exercises} </p>
    </div>
  );
}

const Content = (props) => {
  const parts = props.parts.map(p => {
  return (
    <div>
      <Part name={p.name} exercises={p.exercises}/>
    </div>
  )});
  return (
    <div>
      {parts}
    </div>
  );
}


const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  );
}

const App = (props) => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

