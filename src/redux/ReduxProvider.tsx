"use client"
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useAppSelector } from "./hooks";


export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return <Provider store={store}>{children}</Provider>;
}