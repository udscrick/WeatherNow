"use client"

import Image from "next/image";
import { useState } from "react";

// src/components/common/SearchBar.jsx

const SearchBar = () => {
    const [searchedLocation, setSearchedLocation] = useState('');
    const handleInput = (e) => {
        console.log("Input: ",e.target.value);
        e.len
    }
    return (

<form className="max-w-md mx-auto">   
<div className="flex flex-row items-center justify-between">
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-900 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" onInputCapture={handleInput} className="block w-full p-4 ps-10 text-sm text-gray-900 bg-transparent rounded-lg  focus:ring-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 " placeholder="Search for places..." required />
       
    </div>
    <div className="bg-gray-200 p-1.5 rounded-full box-border">
          <Image src="icons/gps.svg" alt="gps" width={20} height={20}/>
        </div>
        </div>
</form>


    );
  };
  
  export default SearchBar;
  