"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UvIndexCard = () => {
    // Increase the radius for a larger gauge
    const radius = 60; // New larger radius for the gauge
    const strokeWidth = 20; // Thicker stroke for the larger gauge
    const svgSize = radius * 2 + strokeWidth * 2; // SVG size to fit the whole gauge
    const[uvIndex, setUvIndex] = useState(0);
    const maxUvIndex = 12;
  
    // Calculate the circumference of the arc
    const circumference = radius * Math.PI;
    const offset = ((maxUvIndex - uvIndex) / maxUvIndex) * circumference;

    const currentWeather = useSelector((state)=>state.weather.data)
    useEffect(()=>{
        if(currentWeather)
        {
            setUvIndex(Math.round(currentWeather?.current?.uvi))
        }
      
    },[currentWeather])
  
    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-60 justify-center">
        <h2 className="text-lg font-semibold w-full text-left">UV Index</h2>
        <svg
          width={svgSize*1.5} // Set the width to the new SVG size
          height="120" // Set the height to half the new SVG size
          viewBox={`0 -20 ${svgSize} 120`}
        >
          <path
            d={`M ${strokeWidth} ${radius + strokeWidth / 2}
                A ${radius} ${radius} 0 0 1 ${svgSize - strokeWidth} ${radius + strokeWidth / 2}`}
            fill="transparent"
            stroke="#ddd"
            strokeWidth={strokeWidth}
          />
          <path
            d={`M ${strokeWidth} ${radius + strokeWidth / 2}
                A ${radius} ${radius} 0 0 1 ${svgSize - strokeWidth} ${radius + strokeWidth / 2}`}
            fill="transparent"
            stroke="orange"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <text
            x={svgSize / 2}
            y={radius + strokeWidth}
            dy="0em"
            textAnchor="middle"
            fontSize="2em"
            fill="black"
          >
            {uvIndex}
          </text>
          {/* Adjust the x positions of the numbers to align with the ends of the arc */}
          <text x={strokeWidth} y={radius + strokeWidth * 1.5} textAnchor="middle" fontSize="1em" fill="black" dx="-1em">
            0
          </text>
          <text x={svgSize / 2} y={radius + strokeWidth * 1.5} textAnchor="middle" fontSize="1em" fill="black" dy="-5.8em">
            {maxUvIndex / 2}
          </text>
          <text x={svgSize - strokeWidth} y={radius + strokeWidth * 1.5} textAnchor="middle" fontSize="1em" fill="black" dx="0.9em">
            {maxUvIndex}
          </text>
        </svg>
      </div>
    );
  };
  
  export default UvIndexCard;
  