import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../GameContext";
import ParagraphTitle from "./ParagraphTitle";
import PokemonCard from "./PokemonCard";

const ResultCard = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useGameContext();
    const {collectedPokemon, missedPokemon} = state;

    const backToHome = () => {
        navigate("/pokemon-quiz-frontend/");
    }

    return (
        <div className="flex justify-center">
            {/* container */}
            <div className="card">
                {/* game_title */}
                <h1 className="flex justify-center">結果発表！</h1>
                {/* 今回の正解数のコンポーネント */}
                {/* 正解したポケモン一覧 */}
                <ParagraphTitle title={"正解したポケモン一覧"} />
                <div className="grid grid-cols-4 gap-4">
                    {collectedPokemon && collectedPokemon.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))}
                </div>
                {/* わからなかったポケモン一覧 */}
                <ParagraphTitle title={"わからなかったポケモン一覧"} />
                <div className="grid grid-cols-4 gap-4">
                    {missedPokemon && missedPokemon.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))}
                </div>
                {/* トップに戻るボタン */}
                <button className="blue-button" onClick={backToHome}>トップに戻る</button>
            </div>
        </div>
    )
}

export default ResultCard;
