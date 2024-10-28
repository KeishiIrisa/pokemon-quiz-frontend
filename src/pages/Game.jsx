import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../GameContext';
import PokemonQuizCard from '../components/PokemonQuizCard';
import PokemonDetailsCard from '../components/PokemonDetailsCard';
import PokemonDescriptionCard from '../components/PokemonDescriptionCard';
import PopupCard from '../components/PopupCard';

const Game = () => {
  const { state, dispatch, fetchPokemonDetails } = useGameContext();
  const { pokeId, pokemon, isPopupOpen, popupData, timeLeft, isGameFinished } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (pokeId) {
      fetchPokemonDetails(pokeId);
    }
  }, [pokeId, fetchPokemonDetails]);

  useEffect(() => {
    if (isGameFinished) return;

    const timer = setInterval(() => {
      dispatch({ type: 'SET_TIME_LEFT', timeLeft: timeLeft - 1 });
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      dispatch({ type: 'FINISH_GAME' });
      navigate("/pokemon-quiz-frontend/result");
    }

    return () => clearInterval(timer);
  }, [timeLeft, isGameFinished, dispatch, navigate]);

  const handleSetPokeId = async () => {
    const poke_id = Math.floor(Math.random() * 900) + 1;
    dispatch({ type: 'SET_POKE_ID', pokeId: poke_id });
  };

  const showPopup = (index) => {
    dispatch({
      type: 'SET_POPUP_DATA',
      popupData: popupData.map((item, i) => ({
        ...item,
        selected: i === index
      }))
    });
    dispatch({ type: 'SET_POPUP_OPEN', isPopupOpen: true });
  };

  const closePopup = () => {
    dispatch({
      type: 'SET_POPUP_DATA',
      popupData: popupData.map((item) => ({
        ...item,
        selected: false
      }))
    });
    dispatch({ type: 'SET_POPUP_OPEN', isPopupOpen: false });
  };

  // const resetGame = () => {
  //   dispatch({type: 'RESET_GAME'});
  // }

  return (
    <div className="min-h-screen pt-16 pb-8 space-y-8">
      {/* タイマー表示 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Time Left: {timeLeft} seconds</h2>
      </div>
      {/* quiz card */}
      <PokemonQuizCard onSetPokeId={handleSetPokeId} />
      {/* details card */}
      <PokemonDetailsCard pokemon={pokemon} showPopup={showPopup} />
      {/* ポケモン解説カード */}
      <PokemonDescriptionCard pokemon={pokemon} pokeId={pokeId} />
      {/* ポップアップカード */}
      {isPopupOpen && (
        <PopupCard popupData={popupData} closePopup={closePopup} />
      )}
    </div>
  );
};

export default Game;
