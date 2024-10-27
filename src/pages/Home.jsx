import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../GameContext";

const Home = () => {
    const navigate = useNavigate();
    const { fetchPokemonDetails, dispatch} = useGameContext();

    const startGame = async () => {
      const poke_id = Math.floor(Math.random() * 900) + 1;
      dispatch({type: 'SET_POKE_ID', pokeId: poke_id});
      await fetchPokemonDetails(poke_id);
      navigate('/game');
    };

    return (
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold">Learn English With Pokemon!</h1>
          <button
            className="bg-black text-white hover:bg-gray-700 flex mx-auto rounded-xl py-4 px-8"
            type="button"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ); 
};

export default Home;
