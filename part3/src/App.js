import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleVote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id }
    });
    setForceUpdate(forceUpdate + 1);
  };

  const handleSubmit = (event) => {
    const getId = () => (100000 * Math.random()).toFixed(0)
    event.preventDefault();
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote,
        id: getId(),
        votes: 0
      }
    });
    setNewAnecdote('');
  };

  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id + forceUpdate}>
            <div> {anecdote.content} </div>
            <div>
              has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
            </div>
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input value={newAnecdote} onChange={handleNewAnecdoteChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;