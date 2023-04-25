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
  const courseParts = props.course.parts.map(c => {
  return (
    <div>
      <Part name={c.name} exercises={c.exercises} />
    </div>
  )});
  return (
    <div>
      {courseParts}
    </div>
  );
}


const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  );
}

const App = (props) => {
  const course = {
    name:'Half Stack application development',
    parts : [
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
  ]}

  return (
    <div>
      <Header course={course.name} />
      <Content course={course} />
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

