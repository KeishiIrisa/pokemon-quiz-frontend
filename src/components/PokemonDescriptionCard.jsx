import React, {useState} from "react";

const PokemonDescriptionCard = ({ pokemon }) => {
    const [isEnglish, setIsEnglish] = useState(true);

    return (
    <div className="flex justify-center">
        <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4 flex flex-col">
            <p>{pokemon && (isEnglish ? pokemon.pokedescriptions.en.flavor_text : pokemon.pokedescriptions.ja.flavor_text)}</p>
            <p className="flex justify-end">{pokemon && `From ${pokemon && pokemon.pokedescriptions.version}`}</p>
            <button onClick={() => setIsEnglish(!isEnglish)} className="bg-blue-500 text-white rounded-xl py-2 px-4 mt-4">
                {isEnglish ? '日本語' : 'English'}
            </button>
        </div>
    </div>
    )
};

export default PokemonDescriptionCard;
