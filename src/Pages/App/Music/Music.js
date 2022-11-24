import React from 'react'
import styled from 'styled-components'
import {Outlet} from 'react-router-dom'

const MusicCntentBox = styled.div`
    width: 100%;
    height: 720px;
    position: relative;
`;


function Music() {

  return (
    <MusicCntentBox>
        <Outlet/>
    </MusicCntentBox>
  )
}

export default Music