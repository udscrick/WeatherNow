// src/components/CurrentWeather/CurrentWeather.tsx

import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { LocationCard } from "./LocationCard";
import { CurrentWeather } from "./CurrentWeather";

// The component can accept props if you want to make it dynamic, for now, we'll use static content
const LeftPanel: React.FC = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    

  return (
    <div className="bg-white h-screen col-span-1 p-10">
      <SearchBar />
      <div>

        <CurrentWeather/>
        <LocationCard />
      </div>
    </div>
  );
};

export default LeftPanel;
