import { Languages } from "lucide-react";
import React, {useEffect, useState} from "react";
import LanguageToggleButton from "./LanguageToggleButton";

const PokemonDescriptionCard = ({ pokemon, pokeId }) => {
    const [isEnglish, setIsEnglish] = useState(true);

    useEffect(() => {
        setIsEnglish(true);
    }, [pokeId])

    return (
    <div className="flex justify-center">
        <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4 flex flex-col">
            <LanguageToggleButton setIsEnglish={setIsEnglish} isEnglish={isEnglish} />
            <p>{pokemon && (isEnglish ? pokemon.pokedescriptions.en.flavor_text : pokemon.pokedescriptions.ja.flavor_text)}</p>
            <p className="flex justify-end">{pokemon && `From ${pokemon && pokemon.pokedescriptions.version}`}</p>
        </div>
    </div>
    )
};

export default PokemonDescriptionCard;
