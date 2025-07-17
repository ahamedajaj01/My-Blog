import React from "react";
import { themeToggle } from "../../../appFeatures/themeSlice";
import { useDispatch, useSelector } from "react-redux";

function Preferences() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-3xl">Enable dark mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
          onChange = {()=> dispatch(themeToggle())}
          checked={darkMode}
           type="checkbox"
            className="sr-only peer"
             />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
          <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-full peer-checked:left-0.5"></div>
        </label>
      </div>
    </>
  );
}

export default Preferences;
