import Image from 'next/image'
import React from 'react'
import { DayCard } from './weekly/DayCard'
import UvIndexCard from './daily-cards/UVIndexCard'
import WeatherStatsCard from './daily-cards/WeatherStatsCard'
import { SunriseSunsetCard } from './daily-cards/SunriseSunsetCard'

export const RightPanel = () => {
  const days = [1,2,3,4,5,6,7]
  const percentage = 10
  const uvIndex = 5
  const maxUvIndex = 12
  return (
    <div className='bg-gray-100 h-screen col-span-3 text-black p-10'>
      <div className='flex justify-center'>
        <div className="flex space-x-4 overflow-auto max-w-6l flex-wrap">
        {days.map((day, index)=> <DayCard key={index}/>)}
        </div>
      </div>

      <div className='flex justify-start my-10'>
        <h1 className='font-bold'>Today's Highlights</h1>
      </div>

<div className='flex gap-5 flex-wrap justify-center'>
<UvIndexCard uvIndex={5} maxUvIndex={12} />
<WeatherStatsCard type="wind"></WeatherStatsCard>
<SunriseSunsetCard />
<WeatherStatsCard type="humidity"></WeatherStatsCard>
<WeatherStatsCard type="visibility"></WeatherStatsCard>
<WeatherStatsCard type="aqi"></WeatherStatsCard>
</div>
      
    </div>
  )
}
