"use client"
import { fetchWeather } from '@/redux/features/weather/weatherSlice'
import { Location } from '@/types/Location'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export const LocationCard = () => {
    const locationData:Location = useSelector((state:any)=>state.location.selectedLocation)
    const dispatch = useDispatch();
//     useEffect(()=>{
// console.log("Location Info called: ",locationData)
// dispatch(fetchWeather(locationData))
//     },[locationData])
  return (
    <div className="relative w-full h-32 rounded-lg overflow-hidden">
    {/* <img src={cityImage} alt="New York City" className="object-cover w-full h-full" /> */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <span className="absolute bottom-2 left-2 text-white text-sm">New York, NY, USA</span>
  </div>
  )
}
