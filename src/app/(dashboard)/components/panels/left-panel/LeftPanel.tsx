
import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import { LocationCard } from "./LocationCard";
import { CurrentWeather } from "./CurrentWeather";

const LeftPanel: React.FC = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    

  return (
    <div className="bg-white h-screen min-h-full col-span-1 md:col-span-1 p-10">
      <SearchBar />
      <div>

        <CurrentWeather/>
        <LocationCard />
      </div>
    </div>
  );
};

export default LeftPanel;
