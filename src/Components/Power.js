import React from 'react'
import {RiShutDownLine} from 'react-icons/ri'
import styled from 'styled-components'
import { SystemContext,useContext } from '../Context/SystemContext';

const PowerButton = styled.button`
    width: 100px;
    height: 60px;
    top: 230px;
    position: absolute;
    z-index: -1;
    right: 5px;
    background-color: #171717;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 0px 6px 6px 0px;
    transition: 0.6s;
    font-size: 32px;
    color:  #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        transform: translateX(60%);
        color: ${props => props.pwr ? '#CF0A0A' : '#5BB318'};
    }
`;

const PowerIcon = styled(RiShutDownLine)`
    margin-left: 30px;
`;

function Power() {
    const {power,setPower} = useContext(SystemContext);
  return (
    <PowerButton  pwr={power} onClick={()=>setPower(power ? false : true)}>
        <PowerIcon/>
    </PowerButton>
  )
}

export default Power