"use client"
import { useAppSelector } from '@/redux/hooks';
import React, { useEffect, useState } from 'react';

const WeatherStatsCard = ({ type }:{type:string}) => {
  const weatherInfo = useAppSelector((state) => state.weather.data);
  const aqi =  useAppSelector(state => state.aqi.aqi)
  const [title, setTitle] = useState('');
  const [cardData, setCardData] = useState('');
  const [meterValue, setMeterValue] = useState(0);  

  const width = 40;
  const height = 120;
  const barWidth = 30;
  const barHeight = height * 0.8;
  const barX = (width - barWidth) / 2;
  const barY = (height - barHeight) / 2;
  const circleRadius = 10;

  useEffect(() => {
    if (weatherInfo) {
      switch (type) {
        case 'wind':
          setTitle('Wind Status');
          setCardData(`${weatherInfo.current?.wind_speed ?? "N/A"} km/h`);
          break;
        case 'humidity':
          setTitle('Humidity');
          setCardData(`${weatherInfo.current?.humidity ?? "N/A"} %`);
          setMeterValue(weatherInfo.current?.humidity ?? 0);
          break;
        case 'aqi':
          setTitle('Air Quality');
          setCardData(`${aqi ?? "N/A"}`);
          setMeterValue(-1);
          break;
        case 'visibility':
          setTitle('Visibility');
          
          setCardData(`${(weatherInfo.current?.visibility/1000) ?? "N/A"} km`);
          setMeterValue(weatherInfo.current?.aqi ?? 0);
          break;
        default:
          setTitle('Unknown');
          setCardData('N/A');
      }
    }
  }, [weatherInfo, type]);

  const fillHeight = (meterValue / 100) * barHeight;
  const circleY = barY + barHeight - fillHeight;

  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-lg w-60 justify-between flex-shrink-0">
      <div className='flex flex-col justify-between h-full'>
        <h2 className="text-base font-light text-gray-400">{title}</h2>
        <div className="text-4xl font-normal">{cardData}</div>
        {/* <div className="text-sm">
          Normal <span role="img" aria-label="thumbs up">👍</span>
        </div> */}
      </div>
      {(type === 'humidity' ) && (
        <div>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* Rounded rectangle for the bar */}
            <rect
              x={barX}
              y={barY}
              rx="20"
              ry="20"
              width={barWidth}
              height={barHeight}
              fill="#fff"
              stroke='lightgray'
              strokeWidth="1"
            />
            {/* Circle for the meter level */}
            <circle
              cx={width / 2}
              cy={circleY}
              r={circleRadius}
              fill="royalblue"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default WeatherStatsCard;
