import { useState } from "react"


const fetchPokemon = async (id) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  return await response.json();
}

function App() {
  const [pokemon, setPokemon] = useState(null);

  const handleFetchPokemon = async () => {
    const data = await fetchPokemon(803);
    setPokemon(data);
    console.dir(data, { depth: null });
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">Pokemon Quiz</h1>
        <p className="text-gray-700">
          Enjoy pokemon quiz!
        </p>
        <button className="bg-black text-white hover:bg-gray-700 flex mx-auto rounded-xl py-4 px-8" type="button" onClick={handleFetchPokemon}>Click here</button>
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
      {/* Footer */}
      <footer></footer>
    </div>
  )
}

export default App
