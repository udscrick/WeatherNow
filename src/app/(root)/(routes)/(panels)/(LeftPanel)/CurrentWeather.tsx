"use client"
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'


export const CurrentWeather = () => {
    const weather = useAppSelector((state)=>state.weather.data)
    const tempUnit = useAppSelector((state)=>state.weather.temperatureUnit)

  return (
   
    <>
     {weather && 
    (
   <div>
            <div className="mt-14 mr-6 ml-6 flex items-center justify-center">
          <Image alt='rainy_day' src="/img/weather/rainyday.png" width={200} height={200}/>
        </div>
  <div className="flex flex-col items-start justify-center gap-7 mt-10">
          <p className="text-7xl font-sans font-light text-black">
            {Math.round(weather?.current?.temp)}<span className="text-3xl align-top">°{tempUnit}</span>
          </p>
          <p className="text-xl text-black">{weather?.current?.dt.split(' ').join(', ')}</p>
        </div>
        <hr className="w-full border-t border-gray-300 my-8" />
        <div className="w-full">
        <div className="flex items-center justify-start">
          <Image alt="cloud" src="/img/weather/cloudy_icon.png" height={18} width={18}/>
          <span className="ml-2 text-sm text-gray-700 capitalize">{weather?.current?.weather[0]?.description}</span>
        </div>
        <div className="flex items-start justify-start my-4">
          <Image alt="rainy" src="/img/weather/rainy_icon.png" height={18} width={18}/>
          <span className="ml-2 text-sm text-gray-700">Rain - {Math.round(weather?.daily[0]?.rain)| 0} mm/h</span>
        </div>
      </div>
      </div>)
   }
    </>
  )
}
