import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from './../reducers/anecdoteReducer';
import Filter from './Filter';

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        if (state.filter === '') {
            return state.anecdotes;
        } else {
            return state.anecdotes.filter((anecdote) =>
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            )
        }
    });

    const dispatch = useDispatch();

    const handleVote = (id) => {
        dispatch(vote(id));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotes &&
                anecdotes
                    .slice()
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
        </div>
    );
};

export default AnecdoteList;
