import { createContext,useContext } from "react";

const SystemContext = createContext();
const WeatherContext = createContext();

export {SystemContext,WeatherContext,useContext}