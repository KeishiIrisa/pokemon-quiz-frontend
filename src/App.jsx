import { useEffect, useState } from "react"
import { useGameContext } from "./GameContext";
import { Play } from "lucide-react";
import PokemonDescriptionCard from "./components/PokemonDescriptionCard";
import { fetchPokemon, fetchPokemonSpecies, fetchPokemonAbilityDescription } from "./services/pokemonService";
import { selectPokemonDescription } from "./utils/pokemonUtils";
import PokemonDetailsCard from "./components/PokemonDetailsCard";
import PopupCard from "./components/PopupCard";
import PokemonQuizCard from "./components/PokemonQuizCard";


// learn English with Pokemon
// アプリのコンセプトは、ポケモンの紹介（英語表記）、体重、重さなどからポケモンを推測→日本語和訳、シルエットなどのヒントに応じてポイント獲得数が減少→トータルスコアで競う、


function App() {
  const {state, dispatch} = useGameContext();

  // getting these states from state which was got from useGameContext
  const {pokeId, pokemon, collectedPokemon, missedPokemon, isPopupOpen, popupData} = state;
  /*
  interface PopupData [{
    popupTitle: string;
    popupContent_en: string;
    popupContent_ja: string;
    selected: false
  }, ,,,]
  */


  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!pokeId) return;

    // exucute both fetch requests simultaneously
    const [pokemonData, speciesData] = await Promise.all([
      fetchPokemon(pokeId),
      fetchPokemonSpecies(pokeId)
    ]);

    const updatedPokemon = {
      ...pokemonData,
      pokespecies: speciesData
    }

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
        }
        )         
      }
    }
    dispatch({type: 'SET_POPUP_DATA', popupData: popupDatas});

    dispatch({
      type: 'SET_POKEMON',
      pokemon: {
        ...updatedPokemon,
        pokedescriptions: pokedescriptions,
        pokeabilities: abilitiesDatas
      }
    });
    };

    fetchPokemonDetails();
  }, [pokeId, dispatch])


  const handleSetPokeId = async () => {
    const poke_id = Math.floor(Math.random() * 900) + 1;
    dispatch({type: 'SET_POKE_ID', pokeId: poke_id});
  }


  const showPopup = (index) => {
    dispatch({
      type: 'SET_POPUP_DATA',
      popupData: popupData.map((item, i) => ({
        ...item,
        selected: i === index
      }))
    });
    dispatch({type: 'SET_POPUP_OPEN', isPopupOpen: true});
  }

  const closePopup = () => {
    dispatch({
      type: 'SET_POPUP_DATA',
      popupData: popupData.map((item) => ({
        ...item,
        selected: false
      }))
    });
    dispatch({type: 'SET_POPUP_OPEN', isPopupOpen: false});
  }


  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">Learn English With Pokemon!</h1>
        <button
          className="bg-black text-white hover:bg-gray-700 flex mx-auto rounded-xl py-4 px-8"
          type="button"
          onClick={handleSetPokeId}
        >
          <Play className="mr-4"/>
          New Pokemon Quiz
        </button>
      </div>
      {/* quiz card */}
      <PokemonQuizCard pokeId={pokeId} pokemon={pokemon} onSetPokeId={handleSetPokeId}/>
      {/* details card */}
      <PokemonDetailsCard pokemon={pokemon} showPopup={showPopup} />
      {/* ポケモン解説カード */}
      <PokemonDescriptionCard pokemon={pokemon} pokeId={pokeId}/>
      {/* ポップアップカード */}
      {isPopupOpen && (
        // シャドー
        <PopupCard popupData={popupData} closePopup={closePopup} />
      )}
      {/* Footer */}
      <footer></footer>
    </div>
  )
}

export default App
