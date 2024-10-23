import { useEffect, useState } from "react"
import { X, CircleHelp, CircleHelpIcon } from "lucide-react";
import PokemonDescriptionCard from "./components/PokemonDescriptionCard";
import { fetchPokemon, fetchPokemonSpecies, fetchPokemonAbilityDescription } from "./services/pokemonService";
import { selectPokemonDescription } from "./utils/pokemonUtils";
import PokemonDetailsCard from "./components/PokemonDetailsCard";
import PopupCard from "./components/PopupCard";


// learn English with Pokemon
// アプリのコンセプトは、ポケモンの紹介（英語表記）、体重、重さなどからポケモンを推測→日本語和訳、シルエットなどのヒントに応じてポイント獲得数が減少→トータルスコアで競う、


function App() {
  const [pokeId, setPokeId] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  /*
  interface PopupData [{
    popupTitle: string;
    popupContent: string;
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
      if (flavor_en) {
        popupDatas.push({
          popupTitle: ability.name,
          popupContent_en: flavor_en.flavor_text,
          selected: false
        }
        )         
      }
    }
    setPopupData(popupDatas);

    setPokemon({
      ...updatedPokemon,
      pokedescriptions: pokedescriptions,
      pokeabilities: abilitiesDatas
    });


    };

    fetchPokemonDetails();
  }, [pokeId])


  const handleSetPokeId = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const poke_id = formdata.get("poke_id")
    setPokeId(poke_id);
  }


  const showPopup = (index) => {
    setPopupData(popupData.map((item, i) => ({
      ...item,
      selected: i === index
    })));
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setPopupData(popupData.map((item, i) => ({
      ...item,
      selected: false
    })));
    setIsPopupOpen(false)
  }


  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">Learn English With Pokemon!</h1>
        <p className="text-gray-700">
          Enjoy pokemon quiz!
        </p>
        <form onSubmit={handleSetPokeId}><input name="poke_id"/><button type="submit">Search</button></form>
      </div>
      {/* quiz card */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-blue-400 to-slate-400 shadow-md space-y-12 rounded-xl w-[700px] min-h-96 p-8">
          {pokemon ? (
            <>
              <p className="text-center text-xl ">{pokemon.species.name}</p>
              <img className="flex mx-auto h-64 w-64" src={pokemon.sprites.front_default} alt="" />
            </>
          ) : (
            <p className="text-center text-xl ">No such a pokemon</p>
          )}
        </div>
      </div>
      {/* details card */}
      <PokemonDetailsCard pokemon={pokemon} showPopup={showPopup} />
      {/* ポケモン解説カード */}
      <PokemonDescriptionCard pokemon={pokemon} />
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
