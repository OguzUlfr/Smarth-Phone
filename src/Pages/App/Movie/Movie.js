import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';

const MovieContentBox = styled.div`
    width: 100%;
    height: 720px;
`;

function Movie() {
  return (
    <MovieContentBox>
        <Outlet/>
    </MovieContentBox>
  )
}

export default Movie