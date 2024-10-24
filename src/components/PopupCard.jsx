import { X } from "lucide-react";
import React, { useState } from "react";
import LanguageToggleButton from "./LanguageToggleButton";

const PopupCard = ({popupData, closePopup}) => {
    const selectedData = popupData.find(data => data.selected === true);
    const [isEnglish, setIsEnglish] = useState(true);

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closePopup}>
                {/* container */}
                <div className="bg-white rounded-xl shadow-md  w-[700px]" onClick={(e) => e.stopPropagation()}>
                    {/* hero_popup */}
                    <div className="bg-gray-300 rounded-tl-xl rounded-tr-xl p-4 flex items-center justify-between">
                        <div className="flex justify-center items-center space-x-2">
                            <h2>{selectedData?.popupTitle}</h2>
                            <LanguageToggleButton isEnglish={isEnglish} setIsEnglish={setIsEnglish} />
                        </div>
                        <button onClick={closePopup} className="flex">
                        <X></X>
                        </button>
                    </div>
                    {/* content_popup */}
                    <p className="p-10">{isEnglish ? selectedData?.popupContent_en : selectedData.popupContent_ja}</p>
                </div>
            </div>
        );
}

export default PopupCard;
