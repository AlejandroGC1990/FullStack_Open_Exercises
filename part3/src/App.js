import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));
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
      <AnecdoteForm />
    </div>
  );
};

export default App;