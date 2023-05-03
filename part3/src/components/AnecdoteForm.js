import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [newAnecdote, setNewAnecdote] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();
        dispatch(create(newAnecdote));
        setNewAnecdote('');
    };

    return (
        <div>
            <h2> create new </h2>
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
}
export default AnecdoteForm;