import { useState } from "react";
import styled from "styled-components";
import Power from "./Components/Power";
import Volume from "./Components/Volume";
import HomeButton from "./Components/HomeButton";
import TopBar from "./Components/TopBar";
import StartScreen from "./Components/StartScreen";
import { SystemContext,WeatherContext } from "./Context/SystemContext";
import {Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Main from "./Pages/App/Main";
import DateBlock from "./Pages/App/DateBlock";
import Gallery from "./Pages/App/Gallery";
import Clock from "./Pages/App/Clock/Clock";
import Alarm from "./Pages/App/Clock/Alarm";
import StopWatch from "./Pages/App/Clock/StopWatch";
import Timer from "./Pages/App/Clock/Timer";


//Css Process

const PhoneBox = styled.div`
  width:  420px;
  height: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const PhoneBack = styled.div`
  width: 400px;
  height: 820px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: rgb(22,22,22);
  background: linear-gradient(0deg, rgba(22,22,22,1) 0%, rgba(74,74,74,1) 49%, rgba(22,22,22,1) 100%);
`;

const PhoneScreen = styled.div`
  width: 96%;
  height: 98%;
  border-radius: 12px;
  background-color: black;
  position: relative;
  overflow: hidden;
`;



function App() {
  const [power,setPower] = useState(false);
  const [volume,setVolume] = useState(20);
  const [date,setDate] = useState(20);
  const [backgroundImage,setBackgroundImage] = useState('https://i.ibb.co/CVLDP3S/pexels-eberhard-grossgasteiger-1366921-1.jpg');
  const [weather,setWeather] =useState({});


  const systemData = {
    power,
    setPower,
    date,
    setDate,
    volume,
    setVolume,
    backgroundImage,
    setBackgroundImage
  }

  const weatherData = {
    weather,
    setWeather
  }

  return (
    <PhoneBox>
      <SystemContext.Provider value={systemData}>
        <Volume/>
        <Power/>
        <PhoneBack>
          <WeatherContext.Provider value={weatherData}>
          <PhoneScreen>
            <StartScreen/>

            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/App" element={<Main/>}>
                <Route path="Calender" element={<DateBlock/>}/>
                <Route path="Gallery" element={<Gallery/>}/>
                <Route path="Clock" element={<Clock/>}>
                    <Route path="" element={<Alarm/>}/>
                    <Route path="stopwatch" element={<StopWatch/>}/>
                    <Route path="timer" element={<Timer/>}/>
                </Route>
              </Route>
            </Routes>

            <TopBar/>
            <HomeButton/>
          </PhoneScreen>
          </WeatherContext.Provider>
        </PhoneBack>
      </SystemContext.Provider>
    </PhoneBox>
  );
}

export default App;
