"use client"
import { getDayOfWeek } from '@/app/utilities/getDayOfWeek'
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const DayCard = ({dayIndex}:{dayIndex:number}) => {
const weatherInfo = useAppSelector((state)=>state.weather.data )
const [day, setDay] =useState('')
const [high, setHigh] = useState(0)
const [low, setLow] = useState(0)
useEffect(()=>{
    if(weatherInfo){
        console.log("Day Index: ",dayIndex)
        const day = weatherInfo?.daily[dayIndex] ?? null
        if(day){
            setDay(getDayOfWeek(day.dt))
            setHigh(Math.round(day?.temp?.max ?? 0))
            setLow(Math.round(day?.temp?.min ?? 0))
        }
    }
},[weatherInfo])
  return (
    
    <div className='bg-white px-6 py-4 rounded-lg shadow flex-shrink-0'>
        <div>
          {day}
        </div>
        <Image src={`https://openweathermap.org/img/wn/${weatherInfo?.daily[dayIndex]?.weather[0]?.icon}.png`} alt='sunny' width={40} height={40} />
        <div>
          <div>
          <span className=" ont-sans font-light text-black">
            {high}<span className="align-top">°</span>
          </span>
          <span className=" ont-sans font-light text-black">
            {low}<span className="align-top">°</span>
          </span>
          </div>
        </div>
      </div>
  )
}
