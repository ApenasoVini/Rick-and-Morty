import React, { useState } from 'react';
import CharacterList from '../CharacterList/CharacterList';

const CharacterSearch = () => {
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCharacters = (name) => {
        setLoading(true);
        fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setCharacters(data.results);
                    setError(null);
                } else {
                    setCharacters([]);
                    setError('No characters found.');
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setName(inputValue.trim());

        if (inputValue.trim() !== '') {
            fetchCharacters(inputValue);
        } else {
            setCharacters([]);
            setError(null);
        }
    };

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Escreva o nome..."
                    value={name}
                    onChange={handleChange}
                />
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <CharacterList characters={characters} />
        </div>
    );
};

export default CharacterSearch;
