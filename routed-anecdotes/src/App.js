import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Link style={padding} to='/'>
        Home
      </Link>
      <Link style={padding} to='/create'>
        create new
      </Link>
      <Link style={padding} to='/about'>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((anec) => anec.id === Number(id));

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>Author: {anecdote.author}</div>
      <div>Info: {anecdote.info}</div>
      <div>Votes: {anecdote.votes}</div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>
      According to Wikipedia:
      <em>
        An anecdote is a brief, revealing account of an individual person or an incident. Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. An anecdote is "a story with a point."
      </em>
    </p>
    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <Link to='https://fullstackopen.com/'>Full Stack Open</Link>.
    See{' '}
    <Link to='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </Link>{' '}
    for the source code.
  </div>
);

const CreateNew = ({ addNew }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })

    setContent('')
    setAuthor('')
    setInfo('')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random()*1000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`A new anecdote "${anecdote.content}" created`);
    setTimeout(() => {
      setNotification(null)
      navigate('/', {replace: true})
    }, 10000)
  }

  const vote = (id) => {
    const anecdoteIndex = anecdotes.findIndex(anecdote => anecdote.id === id)
    const voted = {
      ...anecdotes[anecdoteIndex],
      votes: anecdotes[anecdoteIndex].votes + 1
    }
    const updatedAnecdotes = [...anecdotes]
    updatedAnecdotes[anecdoteIndex] = voted
    setAnecdotes(updatedAnecdotes)
  }

  return (
    <Router>
      <Menu />
      <div>
        <Routes>
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} vote={vote} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App