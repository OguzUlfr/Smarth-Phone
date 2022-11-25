import React from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import { LocationContext,useContext } from '../../../Context/SystemContext';


const TaxiContentBox = styled.div`
    width: 100%;
    height: 720px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

function Taxi() {
    const {setUserLocation} = useContext(LocationContext);

    useEffect(()=>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
      function showPosition(position) {
        setUserLocation({lat: position.coords.latitude, long:position.coords.longitude});
      }
    },[]);

  return (
    <TaxiContentBox>
        <Outlet/>
    </TaxiContentBox>
  )
}

export default Taxi