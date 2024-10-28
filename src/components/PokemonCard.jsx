import React from "react";

const PokemonCard = ({pokemon}) => {

    return (
        <div>
            <img className="flex mx-auto h-32 w-32" src={pokemon.sprites.front_default} alt="" />
        </div>
    )
}

export default PokemonCard;
