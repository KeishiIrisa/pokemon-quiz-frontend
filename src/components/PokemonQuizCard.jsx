import React, { useEffect, useState } from "react";
import { useGameContext } from "../GameContext";
import { generateAnswerCandidates, getRandomKatakanaCharacter } from "../utils/pokemonUtils";
import AnswerInputCard from "./AnswerInputCard";

const PokemonQuizCard = ({onSetPokeId}) => {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answerCandidates, setAnswerCandidates] = useState([]);
    const [pokemonNameJaName, setPokemonNameJaName] = useState(null);
    const [isImgHidden, setIsImgHidden] = useState(true);
    const {state} = useGameContext();
    const {pokemon, pokeId} = state;

    useEffect(() => {
        setIsAnswerCorrect(null);
        setAnswerCandidates([]);
        setPokemonNameJaName(null);
        setIsImgHidden(true);


        const pokemon_name_ja = pokemon.pokespecies.names.find(
            (entry) => entry.language.name === "ja-Hrkt"
            ) || null;
        const name = pokemon_name_ja ? pokemon_name_ja.name : null;
        setPokemonNameJaName(name)
        const answer = name.split('');
        const candidates = generateAnswerCandidates(answer);
        setAnswerCandidates(candidates);

    }, [pokeId, pokemon]);//this is executed when only pokemon is changed

    useEffect(() => {
        if (isAnswerCorrect) {
            setIsImgHidden(false);
            const timer = setTimeout(() => {
                onSetPokeId();
            }, 800);

            return () => clearTimeout(timer);
        } else if (!isAnswerCorrect) {
            const timer = setTimeout(() => {
                setIsAnswerCorrect(null);
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [isAnswerCorrect, onSetPokeId])

    const handleSetIsHiddenToFalse = () => {
        setIsImgHidden(false);
    }



    const handleAnswerSubmit = (isCorrect) => {
        setIsAnswerCorrect(isCorrect);
    }


    return (
        <div className="flex justify-center">
            {/* Quiz Container */}
            <div className="g-white w-[700px] rounded-xl border-4 border-gray-300 space-y-4">
                <div>
                    <div className="flex bg-black h-16 text-xl font-black text-white rounded-tr-xl rounded-tl-xl items-center justify-center">Question</div>
                {pokemon ? (
                    // Pokemon Image and AnswerInput Card
                    <div className="flex flex-row justify-center m-8 items-center">
                        <img className= {`flex mx-auto h-64 w-64 ${isImgHidden ? 'blur' : ''}`} src={pokemon.sprites.front_default} alt="" />
                        {/* AnswerInputCard */}
                        <AnswerInputCard pokeId={pokeId} answer_candidates={answerCandidates} pokemon_name_ja_name={pokemonNameJaName} onSetIsHiddenToFalse={handleSetIsHiddenToFalse} onAnswerSubmit={handleAnswerSubmit} onSetPokeId={onSetPokeId}/>
                    </div>
                ) : (
                    <p className="text-center text-xl ">スタートボタン押してね</p>
                )}
                </div>
            </div>
        </div>
    );
}

export default PokemonQuizCard;
