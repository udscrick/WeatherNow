import Image from 'next/image'
import React from 'react'

export const DayCard = () => {
  return (
    
    <div className='bg-white px-6 py-4 rounded-lg shadow flex-shrink-0'>
        <div>
          Sun
        </div>
        <Image src={'/img/weather/sunny.png'} alt='sunny' width={40} height={40} />
        <div>
          <div>
          <span className=" ont-sans font-light text-black">
            10<span className="align-top">°</span>
          </span>
          <span className=" ont-sans font-light text-black">
            -3<span className="align-top">°</span>
          </span>
          </div>
        </div>
      </div>
  )
}
