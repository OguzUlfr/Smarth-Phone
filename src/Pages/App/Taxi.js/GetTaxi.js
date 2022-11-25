import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom'
import { LocationContext,useContext } from '../../../Context/SystemContext';
import {BiTime} from 'react-icons/bi'
import {RiPinDistanceFill} from 'react-icons/ri'
import {BsCashCoin} from 'react-icons/bs'


const ResultBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
`;

const TaxiIMageBox = styled.div`
    width: 90%;
    position: relative;
    z-index: 0;
    margin: 20% auto;
`;

const TaxiSlide = keyframes`
    from {left: 100%}
    to {left: 0%}
`;

const WheelSlide = keyframes`
    from {left: 112%}
    to {left: 41px; transform: rotate(-360deg)}
`;
const WheelSlide2 = keyframes`
    from {right: -85%}
    to {right: 59px; transform: rotate(-360deg)}
`;


const TaxiBase = styled.img`
    width: 100%;
    position: relative;
    animation: ${TaxiSlide} 2s;
`;

const TaxiWheel = styled.img`
    width: 13%;
    position: absolute;
    left: 41px;
    top: 50px;
    z-index: 0;
    animation: ${WheelSlide} 2s;
`;

const TaxiWheelTwo = styled.img`
    width: 13%;
    position: absolute;
    right: 59px;
    top: 50px;
    animation: ${WheelSlide2} 2s;
`;

const AboutBox = styled.div`
    width: 80%;
    margin: 0% auto;
`;

const Title = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 2rem;
    font-weight: 600;
    color: #F49D1A;
`;

const Info = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #e6e6e6;
    display: flex;
    align-items: center;
    margin: 10px 0px;
`;

const GetButton = styled.button`
    width: 180px;
    padding: 10px 0px;
    font-size: 1.6rem;
    font-weight: 600;
    background-color: #F49D1A;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    &:hover{
        box-shadow: 0px 0px 23px 0px rgba(231,166,26,1);
    }
`;

function GetTaxi() {
    const {location} = useParams();
    const {userLocation} = useContext(LocationContext);
    const [distance,setDistance] = useState();
    const [distanceInfo,setDistanceInfo] = useState();

    useEffect(()=>{
        setDistanceInfo({Time: (distance * 34) / 60, Price: (distance * 6.30) + 10})
    },[distance]);


    useEffect(()=>{
        axios.get(`https://us1.locationiq.com/v1/directions/driving/${userLocation.lat},${userLocation.long};${location}?key=pk.38a29537b2ac0f659cc94fb7a21ee717&geometries=polyline&overview=full`)
        .then(response => setDistance(Math.floor(response.data.routes[0].distance) / 1000));
    },[]);

  return (
    <ResultBox>
        <TaxiIMageBox>
            <TaxiBase src='https://i.ibb.co/R6mFk3t/taxi-base.png'/>
            <TaxiWheel src='https://i.ibb.co/fGj7nnt/taxi-rims.png'/>
            <TaxiWheelTwo src='https://i.ibb.co/fGj7nnt/taxi-rims.png'/>
        </TaxiIMageBox>
        {distanceInfo &&
            <AboutBox>
            <Title>Destination Info</Title>
            <Info>
                <BiTime size={20} style={{marginRight: '10px',color: '#F49D1A'}}/>
                Estimated Time :
                 <span style={{margin: '0px 10px',color: '#F49D1A'}}>{distanceInfo.Time.toString().slice(0,3) > 59 ? (distanceInfo.Time.toString().slice(0,3)/ 60) : distanceInfo.Time.toString().slice(0,3)}</span>
                 {distanceInfo.Time.toString().slice(0,3) > 59 ? 'Hours' : 'Minute'}
            </Info>
            <Info>
                <RiPinDistanceFill size={20} style={{marginRight: '10px',color: '#F49D1A'}}/>
                Estimated Distance :
                 <span style={{margin: '0px 10px',color: '#F49D1A'}}>{distance}</span>
                 KM
            </Info>
            <Info>
                <BsCashCoin size={20} style={{marginRight: '10px',color: '#F49D1A'}}/>
                Estimated Price :
                 <span style={{margin: '0px 10px',color: '#F49D1A'}}>{Math.floor(distanceInfo.Price)}</span>
                 &#x20BA;
            </Info>
        </AboutBox>
        }
        <GetButton>Get Taxi</GetButton>
    </ResultBox>
  )
}

export default GetTaxi