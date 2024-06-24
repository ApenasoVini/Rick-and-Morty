import React, { useState } from 'react';
import CharacterList from '../CharacterList/CharacterList';
import './CharacterSearch.scss';

const CharacterSearch = () => {
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchCharacters = async (name) => {
        setLoading(true);
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
            if (!response.ok) {
                throw new Error('');
            }
            const data = await response.json();
            setCharacters(data.results || []);
            setError(false);
        } catch (err) {
            setCharacters([]);
            setError(true); 
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const inputValue = event.target.value.trim();
        setName(inputValue);
        if (inputValue) {
            fetchCharacters(inputValue);
        } else {
            setCharacters([]);
            setError(false); 
        }
    };

    return (
        <div className='CharacterSearch'>
            <input
                type="text"
                placeholder="Escreva o nome..."
                value={name}
                onChange={handleChange}
            />
            {error ? (
                <p>Nenhum personagem encontrado</p>
            ) : (
                loading ? (
                    <div className='Spinner'></div>
                ) : (
                    <CharacterList characters={characters} />
                )
            )}
        </div>
    );
};

export default CharacterSearch;
