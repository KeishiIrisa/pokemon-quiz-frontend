import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../GameContext";
import { Timer } from "lucide-react";

const GameOptionCard = ({play_mode}) => {
    const navigate = useNavigate();
    const { fetchPokemonDetails, dispatch } = useGameContext();

    const CARD_CONTENT = {
        "180seconds": {
            "title": "3分コース",
            "description": "制限時間は3分。何匹答えられるか、英語を読んでポケモンを解き明かせ！",
            "play_time": 180
        },
        "300seconds": {
            "title": "5分コース",
            "description": "制限時間は5分。何匹答えられるか、特性やタイプからポケモンを当てよう！",
            "play_time": 300
        },
        "test": {
            "title": "テスト",
            "description": "制限時間15秒",
            "play_time": 15
        }
    }

    const startGame = async () => {
        const play_time = CARD_CONTENT[play_mode].play_time;
        const poke_id = Math.floor(Math.random() * 900) + 1;
        dispatch({type: 'SET_POKE_ID', pokeId: poke_id});
        dispatch({type: 'SET_TIME_LEFT', timeLeft: play_time});
        await fetchPokemonDetails(poke_id);
        navigate("/pokemon-quiz-frontend/game");
    }

    return (
        <div className="flex flex-col bg-black justify-center w-60 h-60 rounded-xl border-4 border-blue-800 p-4 space-y-2">
            {/* Option Title */}
            <div className="flex justify-center space-x-3">
                {/* Icon */}
                <Timer className="text-white"/>
                {/* Title */}
                <h2 className="text-white">{CARD_CONTENT[play_mode].title}</h2>
            </div>
            {/* description */}
            <h4 className="text-white">{CARD_CONTENT[play_mode].description}</h4>
            {/* start button */}
            <button className="blue-button" onClick={startGame}>スタート</button>
        </div>
    )

}

export default GameOptionCard;
