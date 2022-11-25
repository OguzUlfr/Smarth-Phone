import { createContext,useContext } from "react";

const SystemContext = createContext();
const WeatherContext = createContext();
const MusicContext = createContext();
const LocationContext = createContext();

export {SystemContext,WeatherContext,MusicContext,LocationContext,useContext}