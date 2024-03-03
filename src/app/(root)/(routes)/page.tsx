import React from 'react'
import  LeftPanel  from './(panels)/(LeftPanel)/page';
import { RightPanel } from './(panels)/(RightPanel)/page';

const HomePage = () => {
  return (
    <div >
      <div className="grid grid-rows-1 grid-cols-4 ">
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default HomePage;