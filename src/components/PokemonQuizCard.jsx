import React from "react";

const PokemonQuizCard = ({pokemon}) => {
    return (
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
    );
}

export default PokemonQuizCard;
