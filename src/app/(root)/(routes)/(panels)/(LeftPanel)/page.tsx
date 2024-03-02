// src/components/CurrentWeather/CurrentWeather.tsx

import React from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";

// The component can accept props if you want to make it dynamic, for now, we'll use static content
const LeftPanel: React.FC = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  return (
    <div className="bg-white h-screen col-span-1 p-10">
      <SearchBar />
      <div>
        <div className="mt-14 mr-6 ml-6 flex items-center justify-center">
          <Image alt='rainy_day' src="/img/weather/rainyday.png" width={200} height={200}/>
        </div>
        <div className="flex flex-col items-start justify-center gap-7 mt-10">
          <p className="text-7xl font-sans font-light text-black">
            12<span className="text-3xl align-top">°C</span>
          </p>
          <p className="text-xl text-black">Monday, 16:00</p>
        </div>
        <hr className="w-full border-t border-gray-300 my-8" />
        <div className="w-full">
        <div className="flex items-center justify-start">
          {/* Replace with your cloud icon SVG */}
          <Image alt="cloud" src="/img/weather/cloudy_icon.png" height={18} width={18}/>
          <span className="ml-2 text-sm text-gray-700">Mostly Cloudy</span>
        </div>
        <div className="flex items-start justify-start my-4">
          {/* Replace with your rain icon SVG */}
          <Image alt="rainy" src="/img/weather/rainy_icon.png" height={18} width={18}/>
          <span className="ml-2 text-sm text-gray-700">Rain - 30%</span>
        </div>
      </div>
      <div className="relative w-full h-32 rounded-lg overflow-hidden">
        {/* <img src={cityImage} alt="New York City" className="object-cover w-full h-full" /> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <span className="absolute bottom-2 left-2 text-white text-sm">New York, NY, USA</span>
      </div>
      </div>
    </div>
  );
};

export default LeftPanel;
