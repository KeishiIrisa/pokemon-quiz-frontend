import React, { createContext, useReducer, useContext, useCallback } from 'react';
import { fetchPokemon, fetchPokemonSpecies, fetchPokemonAbilityDescription } from './services/pokemonService';
import { selectPokemonDescription } from './utils/pokemonUtils';

const initialState = {
  pokeId: null,
  pokemon: null,
  collectedPokemon: [],
  missedPokemon: [],
  isPopupOpen: false,
  popupData: [],
  timeLeft: 30, // タイマーの初期状態を追加
  isGameFinished: false // ゲーム終了状態を追加
};

// define action type
const SET_POKE_ID = 'SET_POKE_ID';
const SET_POKEMON = 'SET_POKEMON';
const ADD_COLLECTED_POKEMON = 'ADD_COLLECTED_POKEMON';
const ADD_MISSED_POKEMON = 'ADD_MISSED_POKEMON';
const SET_POPUP_OPEN = 'SET_POPUP_OPEN';
const SET_POPUP_DATA = 'SET_POPUP_DATA';
const RESET_GAME = 'RESET_GAME'; // RESET_GAMEアクションタイプを定義
const SET_TIME_LEFT = 'SET_TIME_LEFT'; // タイマーのアクションを追加
const FINISH_GAME = 'FINISH_GAME'; // ゲーム終了のアクションを追加

//reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case SET_POKE_ID:
      return { ...state, pokeId: action.pokeId };
    case SET_POKEMON:
      return { ...state, pokemon: action.pokemon };
    case ADD_COLLECTED_POKEMON:
      return {
        ...state,
        collectedPokemon: [...state.collectedPokemon, action.pokemon],
      };
    case ADD_MISSED_POKEMON:
      return {
        ...state,
        missedPokemon: [...state.missedPokemon, action.pokemon],
      };
    case SET_POPUP_OPEN:
      return { ...state, isPopupOpen: action.isPopupOpen };
    case SET_POPUP_DATA:
      return { ...state, popupData: action.popupData };
    case RESET_GAME:
      return initialState;
    case SET_TIME_LEFT:
      return { ...state, timeLeft: action.timeLeft };
    case FINISH_GAME:
      return { ...state, isGameFinished: true };
    default:
      return state;
  }
};

const GameContext = createContext();

//provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const fetchPokemonDetails = useCallback(async (pokeId) => {
    if (!pokeId) return;

    // exucute both fetch requests simultaneously
    const [pokemonData, speciesData] = await Promise.all([
      fetchPokemon(pokeId),
      fetchPokemonSpecies(pokeId)
    ]);

    const updatedPokemon = {
      ...pokemonData,
      pokespecies: speciesData
    };

    const abilitiesDatas = await fetchPokemonAbilityDescription(updatedPokemon.abilities);

    const pokedescriptions = selectPokemonDescription(updatedPokemon);

    // set ability details to popupData
    const popupDatas = [];
    for (const ability of abilitiesDatas) {
      const flavor_en = ability.flavor_text_entries.filter(entry => entry.language.name === 'en')[0] || null;
      const flavor_ja = ability.flavor_text_entries.filter(entry => entry.language.name === 'ja')[0] || null;

      if (flavor_en) {
        popupDatas.push({
          popupTitle: ability.name,
          popupContent_en: flavor_en.flavor_text,
          popupContent_ja: flavor_ja.flavor_text,
          selected: false
        });
      }
    }
    dispatch({ type: 'SET_POPUP_DATA', popupData: popupDatas });

    dispatch({
      type: 'SET_POKEMON',
      pokemon: {
        ...updatedPokemon,
        pokedescriptions: pokedescriptions,
        pokeabilities: abilitiesDatas
      }
    });
  }, [dispatch]);

  return (
    <GameContext.Provider value={{ state, dispatch, fetchPokemonDetails }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
