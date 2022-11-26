import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom';

const NoteContentBox = styled.div`
    width: 100%;
    height: 720px;
    position: relative;
`;

function Note() {
  return (
    <NoteContentBox>
        <Outlet/>
    </NoteContentBox>
  )
}


export default Note