import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import {SystemContext, useContext} from '../../../Context/SystemContext';


const VideoContentBox = styled.div`
    width: 800px;
    height: 384px;
    transform: rotate(90deg);
    display: flex;
    align-items: center;
    justify-content:center;
    position: absolute;
    left: -55%;
    top: 170px;
    background-color: black;
`;

function Video() {
    const {ytId} = useParams();
    const {volume} =  useContext(SystemContext);
  return (
    <VideoContentBox>
        <ReactPlayer url={`https://youtu.be/${ytId}`} controls={true} playing={true} width={720} height={384} volume={parseFloat(volume / 100)}/>
    </VideoContentBox>
  )
}

export default Video