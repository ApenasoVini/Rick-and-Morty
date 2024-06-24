import React, { useState } from 'react';
import CharacterList from '../CharacterList/CharacterList';
import './CharacterSearch.scss';

const CharacterSearch = () => {
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCharacters = async (name) => {
        setLoading(true);
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCharacters(data.results || []);
        } catch (err) {
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const inputValue = event.target.value.trim();
        setName(inputValue);
        if (inputValue) fetchCharacters(inputValue);
        else setCharacters([]);
    };

    return (
        <div className='CharacterSearch'>
            <input
                type="text"
                placeholder="Escreva o nome..."
                value={name}
                onChange={handleChange}
            />
            {loading ? (
                <div className='Spinner'></div>
            ) : (
                <CharacterList characters={characters} />
            )}
        </div>
    );
};

export default CharacterSearch;
