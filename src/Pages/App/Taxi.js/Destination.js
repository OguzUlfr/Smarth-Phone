import React, { useEffect, useState } from 'react'
import styled,{keyframes} from 'styled-components'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FaLocationArrow} from 'react-icons/fa'
import {MdOutlineAddLocationAlt} from 'react-icons/md'
import {BiCurrentLocation} from 'react-icons/bi'

const InputBox = styled.div`
    width: 100%;
    height: 20%;
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
`;

const LocationInput = styled.input`
    width: 240px;
    padding: 10px 20px 10px 40px;
    font-size: 1.5rem;
    background: transparent;
    border: 1px solid #BF9742;
    border-radius: 8px;
    color: #e6e6e6;
    outline: none;
`;

const LocationSubmitButton = styled(FaLocationArrow)`
    font-size: 2rem;
    color: #BF9742;
    margin-left: 16px;
    cursor: pointer;
    opacity: 0.7;
    &:hover{
        opacity: 1;
    }
`;

const LocationIcon = styled(MdOutlineAddLocationAlt)`
    position:absolute;
    font-size: 1.2rem;
    color: #BF9742;
    left: 16%;
`;

const LocationList = styled.ul`
    width: 100%;
    height: 80%;
    list-style: none;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const LocationListItem = styled(Link)`
    width: 72%;
    height: 60px;
    margin: 20px auto;
    border: 1px solid #BF9742;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover{
        box-shadow: rgba(191, 151, 66, 0.4) 0px 2px 4px, rgba(191, 151, 66, 0.3) 0px 7px 13px -3px, rgba(191, 151, 66, 0.2) 0px -3px 0px inset;
    }
`;

const TextAnimation = keyframes`
    from {left: 14%}
    to   {left: -300%}
`;

const ListItem = styled.div`
    width: max-content;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 400;
    color: #e6e6e6;
    opacity: 0.8;
    position: absolute;
    left: 14%;
    z-index: 0;
    &:hover{
        opacity: 1;
        animation: ${TextAnimation} 10s;
    }
`;

const LocationItemIcon = styled(BiCurrentLocation)`
    font-size: 2rem;
    color: #BF9742;
    background-color: #1a1a1a;
    position: relative;
    z-index: 1;
    padding: 5px;
`;

function Destination() {
    const [inputValue,setInputValue] = useState();
    const [destData,setDestData] = useState();

    const getAddress = () => {
        axios.get(`https://us1.locationiq.com/v1/search?key=pk.38a29537b2ac0f659cc94fb7a21ee717&q=${inputValue}&format=json`)
        .then(response => setDestData(response.data));
    }

  return (
    <>
        <InputBox>
            <LocationIcon/>
            <LocationInput placeholder='Destination' value={inputValue || ''} onChange={e => setInputValue(e.target.value)}/>
            <LocationSubmitButton onClick={getAddress}/>
        </InputBox>
        {destData &&
        <LocationList>
            {
                destData.map((items,key) =>
                    <LocationListItem to={`${items.lat},${items.lon}`} key={key}>
                        <LocationItemIcon/>
                        <ListItem>{items.display_name}</ListItem>
                    </LocationListItem>    
                )
            }
        </LocationList>
        }
    </>
  )
}

export default Destination