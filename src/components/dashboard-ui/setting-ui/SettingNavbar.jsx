import React from "react";
import { Link } from "react-router-dom";

function SettingNavbar() {
  return (
    <>
        <strong className="px-8 text-2xl">Settings</strong>
      <div className="flex justify-start p-4">
        <nav className="flex gap-4 bg-gray-100 p-2 rounded-md dark:bg-gray-800">
          <Link
            to="account"
            className="border  px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:border-blue-500 transition dark:text-white dark:hover:bg-gray-500"
          >
            Account
          </Link>
          <Link
            to="security"
             className="border  px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:border-blue-500 transition dark:text-white dark:hover:bg-gray-500"

          >
            Security
          </Link>
          <Link
            to="preferences"
             className="border  px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:border-blue-500 transition dark:text-white dark:hover:bg-gray-500"

          >
            Preferences
          </Link>
        </nav>
      </div>
    </>
  );
}

export default SettingNavbar;
