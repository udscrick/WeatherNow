import React from 'react'
import LeftPanel from './components/panels/left-panel/LeftPanel';
import RightPanel from './components/panels/right-panel/RightPanel';

const HomePage = () => {
  return (
    <div className='min-h-full min-w-full'>
      <div className="grid grid-rows-1 grid-cols-4 ">
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
      </div>
    </div>
  )
}

export default HomePage;