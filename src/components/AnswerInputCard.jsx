import { ChevronRight, Delete } from "lucide-react";
import React, { useEffect, useState } from "react";

const AnswerInputCard = ({pokeId, answer_candidates, pokemon_name_ja_name, onAnswerSubmit, onSetPokeId}) => {
    const [currentAnswer, setCurrentAnswer] = useState("");

    useEffect(() => {
        setCurrentAnswer("");
    }, [pokeId])

    const checkAnswer = (answer) => {
        return answer === pokemon_name_ja_name
    }

    const handleSubmit = () => {
        const isCorrect = checkAnswer(currentAnswer);
        onAnswerSubmit(isCorrect)
    }

    const handleDeleteLastChar = () => {
        if (currentAnswer.length > 0) {
            setCurrentAnswer(currentAnswer.slice(0, -1));

        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {/* current answer box */}
            <div className="flex bg-white rounded-md border-2 border-black font-black text-3xl mb-8 w-full h-10 justify-center items-center"><p>{currentAnswer}</p></div>
            {/* answer candidates box */}
            <div className="inline-grid grid-cols-5 gap-4">
                {answer_candidates && answer_candidates.map((char, index) => (
                    <button key={index} className="bg-gradient-to-b from-gray-500 to-gray-900 rounded-xl p-2 text-white font-black text-4xl border-2 border-gray-950 w-16 h-16" onClick={() => setCurrentAnswer(currentAnswer + char)}>
                        <span>{char}</span>
                    </button>
                ))}
            </div>
            <div className="flex flex-row items-center mt-8 justify-between w-full">
                <div className="flex flex-col items-center">
                    {/* delete 1 char button */}
                    <button className="flex bg-gradient-to-b from-gray-500 to-gray-900 rounded-xl p-2 border-2 border-gray-950 w-36 h-10 text-white items-center justify-center mb-4" onClick={handleDeleteLastChar}><Delete className="w-10 h-10"/></button>
                    {/* skip this question button */}
                    <button className="flex bg-gradient-to-b from-gray-400 to-gray-600 rounded-xl p-2 border-2 border-gray-950 w-36 h-10 text-white text-xl items-center justify-center" onClick={onSetPokeId}><ChevronRight className="w-8 h-8"/>Skip</button>
                </div>
                {/* send answer button */}
                <button className="flex bg-blue-600 rounded-xl p-2 border-2 border-gray-950 w-56 text-white items-center justify-center h-24 text-xl font-black" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default AnswerInputCard;
