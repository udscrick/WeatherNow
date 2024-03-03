"use client"
import { useAppSelector } from '@/redux/hooks'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const SunriseSunsetCard = () => {
    const [sunrise, setSunrise]  = useState('00:00')
    const [sunset, setSunset]  = useState('00:00')
    const weatherInfo = useAppSelector((state)=>state.weather.data)

    useEffect(()=>{
        if(weatherInfo){
            setSunrise(weatherInfo?.current?.sunrise.split(' ')[1])
            setSunset(weatherInfo?.current?.sunset.split(' ')[1])
        }
    },[weatherInfo])
  return (
    <div className='flex flex-col items-start p-4 bg-white rounded-2xl shadow-lg w-60 justify-start flex-shrink-0 gap-4'>
        <h2 className='text-base font-light text-gray-400'>Sunrise & Sunset</h2>
        <div className="flex gap-4">
            <Image src="/img/weather/sunrise.png" alt='sunrise' width={40} height={40}/>
            <div className="flex flex-col">
                <p className='text-sm'> {sunrise}</p>
                <p className='text-xs text-gray-300 font-normal'>-1m 46s</p>
            </div>
        </div>
        <div className="flex gap-4">
            <Image src="/img/weather/sunset.png" alt='sunrise' width={40} height={40}/>
            <div className="flex flex-col">
                <p className='text-sm'> {sunset}</p>
                <p className='text-xs text-gray-300 font-normal'>-1m 46s</p>
            </div>
        </div>
    </div>
  )
}
