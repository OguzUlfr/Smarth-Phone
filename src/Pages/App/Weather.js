import React, { useEffect } from 'react'
import styled from 'styled-components'
import { WeatherContext,useContext } from '../../Context/SystemContext';

const WeatherContentBox = styled.div`
    width: 100%;
    height: 720px;
`;

const CityTitle = styled.div`
    width: 100%;
    padding: 20px;
    font-size: 2rem;
    color: #e6e6e6;
    text-align: center;
`;

const DailyWeather = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;


const DailyWeatherIcon = styled.img`
    width: 40%;
    margin: auto;
`;

const MainTemp = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 3rem;
    font-weight: 600;
    color: #EFEFEF;
`;

const TempMaxMin = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    opacity: 0.7;
    text-align: center;
    color: #EFEFEF;
    font-weight: 600;
`;

const WeatherInfo = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
    color: #A2B5BB;
    font-weight: 600;
    text-align: center;
`;

const DayList = styled.ul`
    width: 100%;
    height: 48%;
    padding: 0px 20px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width:0px;
    }
`;

const ListItem = styled.li`
    width: 100%;
    height: 60px;
    margin: 10px auto;
    border-bottom: 1px solid #A2B5BB;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
`;

const ListItemDay = styled.span`
    font-size: 1rem;
    color: #EFEFEF;
    font-weight: 600;
`;

const ListItemIcon = styled.img`
    height: 60%;
`;

const ListItemTemp = styled.span`
    font-size: 1rem;
    color: #EFEFEF;
    font-weight: 600;
`;

const ListItemTempMin = styled.span`
    font-size: 1rem;
    color: #EFEFEF;
    font-weight: 400;
    opacity: 0.8;
    margin: 0px 3px;
`;

function Weather() {
    const {weather} = useContext(WeatherContext);

  return (
    <WeatherContentBox>
        <CityTitle>{weather.address}</CityTitle>
        <DailyWeather>
            <DailyWeatherIcon src={process.env.PUBLIC_URL + `/weather-icon/${weather.days[0].icon}.svg`}/>
            <MainTemp>{weather.days[0].temp} &#xb0;</MainTemp>
            <TempMaxMin>{weather.days[0].tempmax}&#xb0; / {weather.days[0].tempmin}&#xb0;</TempMaxMin>
            <WeatherInfo>{weather.days[0].conditions}</WeatherInfo>
        </DailyWeather>
        <DayList>
            {weather.days &&
                weather.days.map((item,key) =>
                key > 0 &&
                <ListItem>
                    <ListItemDay>{item.datetime}</ListItemDay>
                    <ListItemIcon src={process.env.PUBLIC_URL + `/weather-icon/${item.icon}.svg`}/>
                    <ListItemTemp>{item.temp}<ListItemTempMin>/ {item.tempmin}</ListItemTempMin></ListItemTemp>
                </ListItem>
                )
            }
        </DayList>
    </WeatherContentBox>
  )
}

export default Weather