"use client"
import { toggleTemperatureUnit } from '@/redux/features/weather/weatherSlice';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image'
import React, { useState } from 'react'

export const Header = () => {
    const [temperatureUnit, setTemperatureUnit] = useState('C');
    const dispatch = useAppDispatch();
    const handleTempToggleClick = (val: string) =>{
        if(val == 'C'){
            setTemperatureUnit('C')
        }
        else{
            setTemperatureUnit('F')
        }
        dispatch(toggleTemperatureUnit())
    }
  return (
    <div className="flex items-center justify-between px-4 py-2 ">
        <div className="flex space-x-4">
          <button className="font-bold text-gray-700">Today</button>
          <button className="font-bold text-gray-400 underline decoration-black decoration-2 underline-offset-8">
            Week
          </button>
        </div>

        <div className="flex gap-x-4">
          <div className="flex items-center space-x-4">
            <button className={`font-bold ${temperatureUnit === 'C' ? 'text-white bg-black rounded-full p-1' : 'text-black bg-transparent'}`} onClick={()=>handleTempToggleClick('C')}>°C</button>
            <button className={`font-bold ${temperatureUnit === 'F' ? 'text-white bg-black rounded-full p-1' : 'text-black bg-transparent'}`} onClick={()=>handleTempToggleClick('F')}>
              °F
            </button>
          </div>
          <Image
            src="/icons/user.png"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
  )
}
