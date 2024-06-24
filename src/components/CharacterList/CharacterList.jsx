import React from 'react';
import './CharacterList.scss';

const CharacterList = ({ characters }) => {
  return (
    <div className='CharacterList'>
      {characters.map(character => (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
