import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { SystemContext } from '../Context/SystemContext';

const ScreenBack = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    display: ${props => props.display ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`;
const flicker = keyframes`
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

const Logo = styled.img`
    width: 160px;
    display: ${props => props.display ? 'flex' : 'none'};
    animation-name: ${flicker};
    animation-duration: 3s;
    animation-iteration-count: infinite;
`;



function StartScreen() {
    const {power} = useContext(SystemContext);
    const [screen,setScreen] = useState(true);
    const [logo,setLogo] = useState(false);

    useEffect(()=>{
        if(power){
            setLogo(true);
            setTimeout(() => {
                setScreen(false);
            }, 3000);
        }else{
            setScreen(true);
            setTimeout(()=>{
                setLogo(false);
            },3000);
        }
    },[power,screen]);

  return (
    <ScreenBack display={screen}>
        <Logo display={logo} src={process.env.PUBLIC_URL + '/logo.png'} alt=''/>
    </ScreenBack>
  )
}

export default StartScreen