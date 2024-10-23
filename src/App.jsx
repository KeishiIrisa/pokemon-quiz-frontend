import { useEffect, useState } from "react"
import { X } from "lucide-react";


// learn English with Pokemon
// アプリのコンセプトは、ポケモンの紹介（英語表記）、体重、重さなどからポケモンを推測→日本語和訳、シルエットなどのヒントに応じてポイント獲得数が減少→トータルスコアで競う、


const fetchPokemon = async (id) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return await response.json();
}


// pokemonSpecies includes description about the pokemon such as ""This POKéMON has electricity-storing\npouches on its cheeks. These appear to\nbecome electrically charged during the\fnight while PIKACHU sleeps.\nIt occasionally discharges electricity\nwhen it is dozy after waking up.""
const fetchPokemonSpecies = async (id) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );
  return await response.json();
}


// pokemonAbility includes the description of ability the pokemon has.
const fetchPokemonAbilityDescription = async (abilities) => {
  const abilitiesDatas = [];

  for (const ability of abilities) {
    const response = await fetch(ability.ability.url);
    const data = await response.json()
    abilitiesDatas.push(data);
  }
  
  return abilitiesDatas;
}


// pokemon description is array object, so it includes various language description, so this function select two english and japanese sentences which has same meaning.
const selectPokemonDescription = (updatedPokemon) => {
  if (updatedPokemon.pokespecies.flavor_text_entries) {
    // getting japanese flavor text
    const flavors_ja = updatedPokemon.pokespecies.flavor_text_entries
    .filter(entry => entry.language.name === 'ja');
    // getting english flavor text
    const flavors_en = updatedPokemon.pokespecies.flavor_text_entries
    .filter(entry => entry.language.name === 'en');

    const pokemonDescriptions = flavors_ja.map(entry_ja => {
      const entry_en = flavors_en.find(entry_en => entry_en.version.name === entry_ja.version.name);
      if (entry_en) {
        return {
          ja: entry_ja,
          en: entry_en,
          version: entry_en.version.name
        };
      }
      return null;
    }).filter(entry => entry !== null);
    
    return pokemonDescriptions[0]
  };
}

function App() {
  const [pokeId, setPokeId] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  /*
  interface PopupData {
    popupTitle: string;
    popupContent: string;
  }
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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
      {/* description card */}
      <div className="flex justify-center">
        <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4">
          {/* タイプ */}
          <div className="flex items-center">
            <h2>タイプ：</h2>
            {pokemon && pokemon.types.map((type, index) => (
              <span key={index} className="ml-2">
                {type.type.name}
              </span>
            ))}
          </div>
          {/* 高さ、重さ */}
          <div className="flex items-center">
            <h2>高さ：</h2>
            <span className="ml-2 mr-6">{pokemon && `${(pokemon.height/10).toFixed(1)}m`}</span>
            <h2>重さ：</h2>
            <span className="ml-2">{pokemon && `${(pokemon.weight/10).toFixed(1)}kg`}</span>
          </div>
          {/* 特性 */}
          <div className="flex items-center">
            <h2>特性：</h2>
            {pokemon && pokemon.pokeabilities.map((ability, index) => (
              <>
                <span key={index} className="ml-2">
                  {ability.name}
                </span>
                {/* TODO: do not execute setPopupData on clicking element, execute this when handleFethPokemon is executed */}
                <button onClick={() => {
                  const flavor_en = ability.flavor_text_entries.filter(entry => entry.language.name === 'en')[0] || null;
                  if (flavor_en) {
                    setPopupData({
                      popupTitle: ability.name,
                      popupContent_en: flavor_en.flavor_text
                    }) ;         
                  }
                }}>特性❔</button>
              </>

            ))}
          </div>
        </div>
      </div>
      {/* ポケモン解説カード */}
      <div className="flex justify-center">
        <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4 flex flex-col">
          <span>{pokemon && pokemon.pokedescriptions.ja.flavor_text}</span>
          <span>{pokemon && pokemon.pokedescriptions.en.flavor_text}</span>
          <span className="flex justify-end">{pokemon && `From ${pokemon && pokemon.pokedescriptions.version}`}</span>
        </div>
      </div>
      {/* ポップアップカード */}
      {isPopupOpen && popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={togglePopup}>
          {/* シャドー */}
          <div className="bg-white rounded-xl shadow-md  w-[700px]">
            {/* hero_popup */}
            <div className="bg-gray-300 rounded-tl-xl rounded-tr-xl pt-2 pr-2 pl-2 pb-2 flex items-center justify-between">
              <h2>popupData.popupTitle</h2>
              <button onClick={togglePopup} className="flex">
                <X></X>
              </button>
            </div>
            {/* content_popup */}
            <div className="p-2">{popupData.popupContent_en}</div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer></footer>
    </div>
  )
}

export default App
