import { useState } from "react";
import styled from "styled-components";
import Power from "./Components/Power";
import Volume from "./Components/Volume";
import HomeButton from "./Components/HomeButton";
import TopBar from "./Components/TopBar";
import StartScreen from "./Components/StartScreen";
import { SystemContext } from "./Context/SystemContext";

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
  background-color: #e6e6e6;
  position: relative;
  overflow: hidden;
`;



function App() {
  const [power,setPower] = useState(false);
  const [volume,setVolume] = useState(20);
  const [date,setDate] = useState(20);


  const systemData = {
    power,
    setPower,
    date,
    setDate,
    volume,
    setVolume
  }

  return (
    <PhoneBox>
      <SystemContext.Provider value={systemData}>
        <Volume/>
        <Power/>
        <PhoneBack>
          <PhoneScreen>
            <StartScreen/>
            <TopBar/>
            <HomeButton/>
          </PhoneScreen>
        </PhoneBack>
      </SystemContext.Provider>
    </PhoneBox>
  );
}

export default App;
