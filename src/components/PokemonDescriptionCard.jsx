import { Languages } from "lucide-react";
import React, {useState} from "react";

const PokemonDescriptionCard = ({ pokemon }) => {
    const [isEnglish, setIsEnglish] = useState(true);

    return (
    <div className="flex justify-center">
        <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4 flex flex-col">
            <button onClick={() => setIsEnglish(!isEnglish)} className="flex justify-end rounded-full">
                <Languages />
            </button>
            <p>{pokemon && (isEnglish ? pokemon.pokedescriptions.en.flavor_text : pokemon.pokedescriptions.ja.flavor_text)}</p>
            <p className="flex justify-end">{pokemon && `From ${pokemon && pokemon.pokedescriptions.version}`}</p>
        </div>
    </div>
    )
};

export default PokemonDescriptionCard;
