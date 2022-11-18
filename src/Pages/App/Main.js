import React from 'react'
import styled from 'styled-components'
import DateBlock from './DateBlock.js'

const AppBack = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
`;

const AppContentBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0px;
    position: relative;
`;


function Main() {
  return (
    <AppBack>
        <AppContentBox>
            <DateBlock/>
        </AppContentBox>
    </AppBack>
  )
}

export default Main