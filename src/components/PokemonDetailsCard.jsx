import { CircleHelpIcon } from 'lucide-react';
import React, {useState} from 'react';

const PokemonDetailsCard = ({pokemon, showPopup}) => {
    return (
        <div className="flex justify-center">
            <div className="bg-white w-[700px] rounded-xl p-8 border-4 border-gray-300 space-y-4">
                {/* タイプ */}
                <div className="flex items-center">
                    <h2>Type:</h2>
                    {pokemon && pokemon.types.map((type, index) => (
                    <p key={index} className="ml-2">
                        {type.type.name}
                    </p>
                    ))}
                </div>
                {/* 高さ、重さ */}
                <div className="flex items-center">
                    <h2>Height:</h2>
                    <p className="ml-2 mr-6">{pokemon && `${(pokemon.height/10).toFixed(1)}m`}</p>
                    <h2>Weight:</h2>
                    <p className="ml-2">{pokemon && `${(pokemon.weight/10).toFixed(1)}kg`}</p>
                </div>
                {/* 特性 */}
                <div className="flex items-center">
                    <h2>Ability:</h2>
                    {pokemon && pokemon.pokeabilities.map((ability, index) => (
                    <>
                        <p key={index} className="ml-2">
                        {ability.name}
                        </p>
                        {/* TODO: do not execute setPopupData on clicking element, execute this when handleFethPokemon is executed */}
                        <button onClick={() => showPopup(index)} className="flex justify-center rounded-3xl border-4 border-gray-300 pt-0.5 pb-0.5 pl-2 pr-2 text-s ml-4" ><CircleHelpIcon />Ability</button>
                    </>

                    ))}
                </div>
            </div>
      </div>
    )
};

export default PokemonDetailsCard;
