import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState('');

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const handleCreate = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(newAnecdote));
    setNewAnecdote('');
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes &&
        anecdotes
          .sort((a, b) => b.votes - a.votes) // ordenar anécdotas por votos
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div> {anecdote.content} </div>
              <div>
                has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
              </div>
            </div>
          ))}
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input
            value={newAnecdote}
            onChange={(event) => setNewAnecdote(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;