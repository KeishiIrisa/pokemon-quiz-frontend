import { X } from "lucide-react";
import React from "react";

const PopupCard = ({popupData, closePopup}) => {
const selectedData = popupData.find(data => data.selected === true);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closePopup}>
            {/* container */}
            <div className="bg-white rounded-xl shadow-md  w-[700px]">
                {/* hero_popup */}
                <div className="bg-gray-300 rounded-tl-xl rounded-tr-xl p-4 flex items-center justify-between">
                    <h2>{selectedData?.popupTitle}</h2>
                    <button onClick={closePopup} className="flex">
                    <X></X>
                    </button>
                </div>
                {/* content_popup */}
                <p className="p-10">{selectedData?.popupContent_en}</p>
            </div>
        </div>
    )
}

export default PopupCard;
