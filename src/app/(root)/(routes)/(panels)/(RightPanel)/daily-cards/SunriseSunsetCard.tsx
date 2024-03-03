"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const SunriseSunsetCard = () => {
    const [sunrise, setSunrise]  = useState('00:00')
    const [sunset, setSunset]  = useState('00:00')
    const weatherInfo = useSelector((state)=>state.weather.data)

    useEffect(()=>{
        if(weatherInfo){
            setSunrise(weatherInfo?.current?.sunrise.split(' ')[1])
            setSunset(weatherInfo?.current?.sunset.split(' ')[1])
        }
    },[weatherInfo])
  return (
    <div className='flex flex-col items-start p-4 bg-white rounded-lg shadow-lg w-60 justify-start flex-shrink-0 gap-4'>
        <h2>Sunrise & Sunset</h2>
        <div className="flex gap-4">
            <Image src="/img/weather/sunrise.png" alt='sunrise' width={40} height={40}/>
            <div className="flex flex-col">
                <p> {sunrise}</p>
                <p>-1m 46s</p>
            </div>
        </div>
        <div className="flex gap-4">
            <Image src="/img/weather/sunset.png" alt='sunrise' width={40} height={40}/>
            <div className="flex flex-col">
                <p> {sunset}</p>
                <p>-1m 46s</p>
            </div>
        </div>
    </div>
  )
}
