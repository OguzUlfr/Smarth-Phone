import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const YoutubeContentBox = styled.div`
    width: 100%;
    height: 720px;
    position: relative;
`;

function Youtube() {
  return (
    <YoutubeContentBox>
        <Outlet/>
    </YoutubeContentBox>
  )
}

export default Youtube