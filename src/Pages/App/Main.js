import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';
import AnimationPage from '../../AnimationPage';

const AppBack = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
`;

const AppContentBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0px;
`;


function Main() {
  return (
    <AppBack>
      <AnimationPage>
        <AppContentBox>
          <Outlet/>
        </AppContentBox>
      </AnimationPage>
    </AppBack>
  )
}

export default Main