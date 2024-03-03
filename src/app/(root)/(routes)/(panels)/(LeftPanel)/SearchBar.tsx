"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLocation, setSelectedLocation } from "@/redux/features/location/locationSlice";
import { AppDispatch } from "@/redux/store";
import { Location } from "@/types/Location";

// src/components/common/SearchBar.jsx

const SearchBar = () => {
    const [searchedLocation, setSearchedLocation] = useState('');
    const [showResults, setShowResults] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState([]);

    const handleInput = async(e) => {
        const response = await dispatch(fetchLocation(e.target.value))
        if(response.payload){
            setSearchedLocation(e.target.value); 
            setShowResults(true);
            setData(response.payload);
        }
      
        
    }
     
    const handleLocationSelect = (location: Location) =>{
        setShowResults(false);
        if(location){
            setSearchedLocation(location.name)
            dispatch(setSelectedLocation(location))
            
        }

    }



    return (
<div className="max-w-md mx-auto relative"> 
<form className="max-w-md mx-auto">   
<div className="flex flex-row items-center justify-between">
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-900 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" defaultValue={searchedLocation} onInputCapture={handleInput} className="block w-full p-4 ps-10 text-sm text-gray-900 bg-transparent rounded-lg  focus:ring-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 " placeholder="Search for places..." required />
       
    </div>
    <div className="bg-gray-200 p-1.5 rounded-full box-border">
          <Image src="icons/gps.svg" alt="gps" width={20} height={20}/>
        </div>
        </div>
</form>

{searchedLocation && showResults && (
    <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto rounded-md mt-1">
        { data && data.length>0&& data.map((location:Location, index) => (
            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer text-black" onClick={() => handleLocationSelect(location)}>
                {location.name}
            </li>
        ))}
    </ul>

)}
</div>

    );
  };
  
  export default SearchBar;
  