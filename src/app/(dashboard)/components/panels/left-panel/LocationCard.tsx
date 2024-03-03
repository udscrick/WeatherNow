"use client";
import { useAppSelector } from "@/redux/hooks";
import { Location } from "@/types/Location";
import React, { useEffect, useState } from "react";

export const LocationCard = () => {
  const imageData: any = useAppSelector((state: any) => state.image.data);
  const location: Location = useAppSelector(
    (state: any) => state.location.selectedLocation
  );
  const [cityImage, setCityImage] = useState("");
  const [cityName, setCityName] = useState("");
  useEffect(() => {
    if (location) {
      setCityName(location.name);
    }
  }, [location]);
  useEffect(() => {
    if (imageData) {
      setCityImage(imageData.urls.regular);
    }
  }, [imageData]);

  return (
    <>
      {location && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <img
            src={cityImage}
            alt="City"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-95"></div>
          <span className="absolute inset-0 flex justify-center items-center text-white text-sm">
            {cityName}
          </span>
        </div>
      )}
    </>
  );
};
