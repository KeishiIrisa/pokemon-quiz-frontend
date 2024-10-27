import React from 'react';
import { useGameContext } from '../GameContext';

const Result = () => {
  const { state } = useGameContext();
  const { collectedPokemon, missedPokemon } = state;

  return (
    <div className="text-center space-y-8">
      <h1 className="text-5xl font-bold">Game Result</h1>
      <div>
        <h2 className="text-3xl font-bold">Collected Pokemon</h2>
        <ul>
          {collectedPokemon.map((poke, index) => (
            <li key={index}>{poke.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Missed Pokemon</h2>
        <ul>
          {missedPokemon.map((poke, index) => (
            <li key={index}>{poke.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Result;
