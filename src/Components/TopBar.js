import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import {MdSignalWifi3Bar,MdSignalCellular3Bar,MdBattery80} from 'react-icons/md'
import { SystemContext,useContext } from '../Context/SystemContext'

const BarBox = styled.div`
    width: 100%;
    height: 40px;
    padding: 0px 10px;
    display: ${props => props.display ? 'flex' : 'none'};
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 0px;
    z-index: 3;
`;

const Clock = styled.div`
    font-size: 16px;
    color: #e6e6e6;
    font-weight: 600;
    width: 72px;
`;

const BarCenter = styled.div`
    height: 100%;
`;

const BarIconBox = styled.div`
    color: #e6e6e6;
    font-size: 16px;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 7px;
    align-items: center;
`;

const BatteryIcon = styled(MdBattery80)`
    transform: rotate(90deg);
    font-size: 26px;
`;

function TopBar() {
    const {power,date,setDate} = useContext(SystemContext);
    const [bar,setBar] = useState(false);
    useEffect(()=>{
        if(power){
            setTimeout(() => {
                setBar(true);
            }, 3000);
        }else{
            setBar(false);
        }
    },[power]);

    setInterval(() => {
        const dates = new Date();
        const hours = dates.getHours();
        const minute = dates.getMinutes();
        const second = dates.getSeconds();
        if(hours < 10){
            setDate(`0${hours} : ${minute}: ${second}`);
        }else if (minute < 10){
            setDate(`${hours} : 0${minute}: ${second}`);
        }else if(second < 10){
            setDate(`${hours} : ${minute}: 0${second}`);
        }else{
            setDate(`${hours} : ${minute}: ${second}`);
        }
    }, 1000);

  return (
    <BarBox display={bar}>
        <Clock>{date.toString().slice(0,7)}</Clock>
        <BarCenter><img src='https://i.ibb.co/JWZhKxd/topBar.png' alt=''/></BarCenter>
        <BarIconBox>
            <MdSignalWifi3Bar/>
            <MdSignalCellular3Bar/>
            <BatteryIcon/>
        </BarIconBox>
    </BarBox>
  )
}

export default TopBar