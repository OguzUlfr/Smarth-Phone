import React from 'react';
import styled from 'styled-components';
import {BsFillVolumeDownFill,BsFillVolumeUpFill} from 'react-icons/bs';
import { useContext } from 'react';
import { SystemContext } from '../Context/SystemContext';

//Css Process

const VolumeBox = styled.div`
    width: auto;
    height: auto;
    position: absolute;
    right: 5px;
    top: 100px;
    display: flex;
    flex-direction: column;
    z-index: -1;
    transition: 0.6s;
    &:hover{
        transform: translateX(60%);
    }
`;

const VolumeButton = styled.button`
    width: 100px;
    height: 60px;
    border: none;
    outline: none;
    background-color: #161616;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color:  #808080;
    cursor: pointer;
    &:hover{
        color: #e6e6e6;
    }
`;

const VolumeUpIcon = styled(BsFillVolumeUpFill)`
    margin-left: 30px;
`;
const VolumeDownIcon = styled(BsFillVolumeDownFill)`
    margin-left: 30px;
`;

const VolumeUp = styled(VolumeButton)`
    border-radius: 0px 6px 0px 0px;
`;

const VolumeDown = styled(VolumeButton)`
    border-radius: 0px 0px 6px 0px;
`;

function Volume() {
    const {volume,setVolume} = useContext(SystemContext);

    const volumeUp = () => {
        if(volume < 100){
            setVolume(volume + 10);
        }
    }
    const volumeDown = () => {
        if(volume > 0){
            setVolume(volume - 10);
        }
    }

  return (
    <VolumeBox>
        <VolumeUp onClick={volumeUp}>
            <VolumeUpIcon/>
        </VolumeUp>
        <VolumeDown onClick={volumeDown}>
            <VolumeDownIcon/>
        </VolumeDown>
    </VolumeBox>
  )
}

export default Volume