import React from 'react'
import { useEffect,useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { SystemContext,useContext, WeatherContext } from '../../../Context/SystemContext';
import {TbBuildingSkyscraper} from 'react-icons/tb';
import {Link} from 'react-router-dom'



const WidgetBox = styled.div`
    width: 90%;
    height: 160px;
    margin-top: 24px;
    border-radius: 12px;
    background-color: rgba(0,0,0,0.4);
    color: #e6e6e6;
    display: flex;
    align-items: center;
`;

const Date = styled.div`
    width: 60%;
    height: 80%;
    border-right: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Clock = styled.div`
    font-size: 3rem;
    font-weight: 600;
    padding: 6px;
`;

const Day = styled.div`
    width: 100%;
    height: auto;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 10px;
    padding: 0px 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const City = styled(Day)`
    font-size: 0.8rem;
`;

const CityIcon = styled(TbBuildingSkyscraper)`
    font-size: 1rem;
    margin-right: 8px;
`;

const Weather = styled(Link)`
    width: 40%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-decoration: none;
    color: #e6e6e6;
`;

const WeatherIcon = styled.img`
    width: 90px;
`;

const Temp = styled.div`
    font-weight: 600;
    padding : 5px 0px;
    font-size: 1.6rem;
`;

const TempDay = styled.div`
    font-weight: 400;
    font-size: 1rem;
    opacity: 0.8;
`;

function Widget() {
    const {date} = useContext(SystemContext);
    const {weather,setWeather} = useContext(WeatherContext);
    const [day,setDay] = useState();

    useEffect(()=>{
        const d = new window.Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];    
        setInterval(() => {
            setDay(`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`);
        }, 1000);
    },[]);

    useEffect(()=>{
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/İstanbul/next7days?unitGroup=metric&include=days&key=ERBAQ8A68T43ZB5KE4STYYSQS&contentType=json`)
        .then(response => {
            setWeather(response.data);
        });
    },[]);


  return (
    <WidgetBox>
        <Date>
            <Clock>{date.toString().slice(0,7)}</Clock>
            <Day>{day}</Day>
            <City><CityIcon/>İstanbul</City>
        </Date>
        <Weather to='/App/Weather'>
            {weather.days &&
            <>
                <WeatherIcon src={process.env.PUBLIC_URL + `/weather-icon/${weather.days[0].icon}.svg`}/>
                <Temp>{weather.days[0].temp}</Temp>
                <TempDay>{`${weather.days[0].tempmax} / ${weather.days[0].tempmin}`}</TempDay>
            </>
            }
        </Weather>
    </WidgetBox>
  )
}

export default Widget