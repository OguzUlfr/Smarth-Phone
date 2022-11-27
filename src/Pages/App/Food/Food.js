import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const FoodContentBox = styled.div`
    width: 100%;
    height: 720px;
    position: relative;
`;

function Food() {
  return (
    <FoodContentBox>
        <Outlet/>
    </FoodContentBox>
  )
}

export default Food