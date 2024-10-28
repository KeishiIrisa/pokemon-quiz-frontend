import React from "react";

const ParagraphTitle = ({title}) => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="bg-black h-[2px] w-6"></div>
            <p className="text-black font-bold text-lg">{title}</p>
            <div className="bg-black h-[2px] w-6"></div>
        </div>
    )
}

export default ParagraphTitle;
