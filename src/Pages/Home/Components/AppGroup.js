import React from 'react'
import styled from 'styled-components'
import apps from './AppList';
import { Link } from 'react-router-dom';

const AppBox = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 10px;
    row-gap: 20px;
    place-items: center;
    padding: 20px 0px;
`;

const App = styled.button`
    width: 72px;
    height: auto;
    background-color: transparent;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    &:hover{
        transition: 0.2s;
        transform: scale(1.05);
    }
`;

const AppIcon = styled.div`
        width: 64px;
        height: 64px;
        background-color: ${props => props.bg || '#000'};
        border: none;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
`;

const AppName = styled.div`
    width: 100%;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
    letter-spacing: 0.6px;
    background-color: rgba(0,0,0,0.3);
    color: #fff;
`;

function AppList() {
  return (
    <AppBox>
        {apps &&
            apps.map(app => 
            <Link to={`App/${app.name}`} style={{textDecoration : 'none'}}  key={app.id}>
                <App>
                    <AppIcon bg={app.color}>
                        {app.library}
                    </AppIcon>
                    <AppName>{app.name}</AppName>
                </App>
            </Link>
            )
        }
    </AppBox>
  )
}

export default AppList