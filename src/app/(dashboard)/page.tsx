"use client"
import React, { useEffect } from 'react'
import LeftPanel from './components/panels/left-panel/LeftPanel';
import RightPanel from './components/panels/right-panel/RightPanel';
import { useAppSelector } from '@/redux/hooks';
import Loader from '../common/Loader';

const HomePage = () => {
  const isLoading = useAppSelector((state)=>state.loading.isLoading);
  useEffect(()=>{
    console.log("Is App Loading?",isLoading)
  },[isLoading])
  return (
    
    <div className='min-h-full min-w-full'>
      {isLoading&&<Loader/>}
      
      <div className="grid grid-rows-1 grid-cols-4 ">
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default HomePage;