import { useState } from "react";
import styled from "styled-components";
import Power from "./Components/Power";
import Volume from "./Components/Volume";
import HomeButton from "./Components/HomeButton";
import TopBar from "./Components/TopBar";
import StartScreen from "./Components/StartScreen";
import { SystemContext,WeatherContext,LocationContext, MusicContext} from "./Context/SystemContext";
import {Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Main from "./Pages/App/Main";
import DateBlock from "./Pages/App/DateBlock";
import Gallery from "./Pages/App/Gallery";
import Clock from "./Pages/App/Clock/Clock";
import Alarm from "./Pages/App/Clock/Alarm";
import StopWatch from "./Pages/App/Clock/StopWatch";
import Timer from "./Pages/App/Clock/Timer";
import Music from "./Pages/App/Music/Music";
import MusicStartScreen from "./Pages/App/Music/MusicStartScreen";
import MusicList from "./Pages/App/Music/MusicList";
import Taxi from "./Pages/App/Taxi.js/Taxi";
import LocationAccessError from "./Pages/App/Taxi.js/LocationAccessError";
import Destination from "./Pages/App/Taxi.js/Destination";
import GetTaxi from "./Pages/App/Taxi.js/GetTaxi";


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
  const [music,setMusic] = useState(false);
  const [backgroundImage,setBackgroundImage] = useState('https://i.ibb.co/CVLDP3S/pexels-eberhard-grossgasteiger-1366921-1.jpg');
  const [weather,setWeather] =useState({});
  const [userLocation,setUserLocation] = useState(false);


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

  const musicData = {
    music,
    setMusic
  }

  const weatherData = {
    weather,
    setWeather
  }

  const locationData = {
    userLocation,
    setUserLocation
  }

  return (
    <PhoneBox>
      <SystemContext.Provider value={systemData}>
        <Volume/>
        <Power/>
        <PhoneBack>
          <WeatherContext.Provider value={weatherData}>
          <MusicContext.Provider value={musicData}>
          <PhoneScreen>
            <StartScreen/>
            <LocationContext.Provider value={locationData}>
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
                  <Route path="Music" element={<Music/>}>
                    <Route path="" element={<MusicStartScreen/>}/>
                    <Route path=":searchKey" element={<MusicList/>}/>
                  </Route>
                  <Route path="Taxi" element={<Taxi/>}>
                    <Route path="" element={userLocation ? <Destination/> :<LocationAccessError/>}/>
                    <Route path=":location" element={<GetTaxi/>}/>
                  </Route>
                </Route>
              </Routes>
              </LocationContext.Provider>
            <TopBar/>
            <HomeButton/>
          </PhoneScreen>
          </MusicContext.Provider>
          </WeatherContext.Provider>
        </PhoneBack>
      </SystemContext.Provider>
    </PhoneBox>
  );
}

export default App;
