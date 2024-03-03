"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const WeatherStatsCard = ({ type }) => {
  const weatherInfo = useSelector((state) => state.weather.data);
  const [title, setTitle] = useState('');
  const [cardData, setCardData] = useState('');
  const [meterValue, setMeterValue] = useState(0); // Add state to keep track of meter value

  // SVG dimensions
  const width = 40;
  const height = 130;
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
          setCardData(`${weatherInfo.current?.aqi ?? "N/A"}`);
          setMeterValue(weatherInfo.current?.aqi ?? 0);
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

  // Calculate the fill height for the meter based on the meter value
  const fillHeight = (meterValue / 100) * barHeight;
  const circleY = barY + barHeight - fillHeight;

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg w-60 justify-between flex-shrink-0">
      <div className='flex flex-col justify-between h-full'>
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="text-4xl font-bold">{cardData}</div>
        <div className="text-sm">
          Normal <span role="img" aria-label="thumbs up">👍</span>
        </div>
      </div>
      {(type === 'humidity' || type === 'aqi') && (
        <div>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* Rounded rectangle for the bar */}
            <rect
              x={barX}
              y={barY}
              rx={circleRadius}
              ry={circleRadius}
              width={barWidth}
              height={barHeight}
              fill="#fff"
              stroke='gray'
              strokeWidth="1"
            />
            {/* Circle for the meter level */}
            <circle
              cx={width / 2}
              cy={circleY}
              r={circleRadius}
              fill="blue"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default WeatherStatsCard;
