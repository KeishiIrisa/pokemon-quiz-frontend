import { Languages } from "lucide-react";
import React from "react";

const LanguageToggleButton = ({ setIsEnglish, isEnglish }) => {
    return (
        <button onClick={() => setIsEnglish(!isEnglish)} className="flex justify-end rounded-full">
            <Languages />
        </button>
    );
}

export default LanguageToggleButton;
