import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  pokeId: null,
  pokemon: null,
  collectedPokemon: [],
  missedPokemon: [],
  isPopupOpen: false,
  popupData: [],
};

// define action type
const SET_POKE_ID = "SET_POKE_ID";
const SET_POKEMON = "SET_POKEMON";
const ADD_COLLECTED_POKEMON = "ADD_COLLECTED_POKEMON";
const ADD_MISSED_POKEMON = "ADD_MISSED_POKEMON";
const SET_POPUP_OPEN = "SET_POPUP_OPEN";
const SET_POPUP_DATA = "SET_POPUP_DATA";

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
    default:
      return state;
  }
};

const GameContext = createContext();

//provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
