import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineBook } from "react-icons/ai";
import { AiOutlineHolder } from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

const EventPopup = ({ event, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 animate-fade-in sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <div className="flex items-center w-full">
            <AiOutlineBook className="text-green-600 text-lg mr-2" />
            <h2 className="text-lg font-semibold text-gray-800 flex-1">
              {event.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
        </div>
        <div className="text-gray-700 space-y-4">
          <div className="flex ">
            <AiOutlineHolder className="text-lg mr-2" size={19} />
            <p className="text-base text-justify flex-1">
              {event.resource.description}
            </p>
          </div>

          <div className="flex items-center">
            <BsCalendar2Check className="text-lg mr-2" size={15} />
            <p className="text-justify flex-1">{event.end.toDateString()}</p>
          </div>

          <div className="flex items-center">
            <CiLock className="text-lg mr-2" size={18} />
            <p className="text-justify flex-1">{event.resource.holidayType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
