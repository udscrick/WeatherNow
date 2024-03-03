import React from "react";
import { DayCard } from "./weekly/DayCard";
import UvIndexCard from "./daily-cards/UVIndexCard";
import WeatherStatsCard from "./daily-cards/WeatherStatsCard";
import { SunriseSunsetCard } from "./daily-cards/SunriseSunsetCard";
import { Header } from "./Header";

 const RightPanel = () => {
  const days = [0, 1, 2, 3, 4, 5, 6];
  
  return (
    <div className="bg-gray-100 min-h-full col-span-3 text-black p-10">
      <Header /> 
      <div className="flex justify-center">
        <div className="flex space-x-4 overflow-auto max-w-6l flex-wrap">
          {days.map((day, index) => (
            <DayCard key={index} dayIndex={day} />
          ))}
        </div>
      </div>

      <div className="flex justify-start my-10">
        <h1 className="font-bold">Today&apos;s Highlights</h1>
      </div>

      <div className="flex gap-5 flex-wrap justify-center">
        <UvIndexCard />
        <WeatherStatsCard type="wind"></WeatherStatsCard>
        <SunriseSunsetCard />
        <WeatherStatsCard type="humidity"></WeatherStatsCard>
        <WeatherStatsCard type="visibility"></WeatherStatsCard>
        <WeatherStatsCard type="aqi"></WeatherStatsCard>
      </div>
    </div>
  );
};

export default RightPanel;