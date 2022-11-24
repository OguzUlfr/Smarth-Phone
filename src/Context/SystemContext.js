import { createContext,useContext } from "react";

const SystemContext = createContext();
const WeatherContext = createContext();
const MusicContext = createContext();

export {SystemContext,WeatherContext,MusicContext,useContext}