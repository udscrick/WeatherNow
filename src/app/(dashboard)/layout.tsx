import ReduxProvider from '@/redux/ReduxProvider'
import React, { useState } from 'react'

const WeatherContainer = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <ReduxProvider>
     {children}
    </ReduxProvider>
  )
}

export default WeatherContainer