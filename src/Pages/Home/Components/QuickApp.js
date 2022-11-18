import React from 'react'
import styled from 'styled-components'
import {IoCall} from 'react-icons/io5'
import {HiUsers} from 'react-icons/hi'
import {TbMessage2} from 'react-icons/tb'
import {BsFillCameraFill} from 'react-icons/bs'

const QuickBox = styled.div`
    width: 80%;
    position: absolute;
    bottom: 60px;
    display: grid;
    grid-template-columns: auto auto auto auto;
`;

const App = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background-color: ${props => props.bgColor || '#e6e6e6'};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    &:hover{
        transition: 0.2s;
        transform: scale(1.05);
    }
`;

function QuickApp() {
  return (
    <QuickBox>
        <App bgColor='#0AA419'><IoCall size={40}/></App>
        <App bgColor='#FC9918'><HiUsers size={40}/></App>
        <App bgColor='#1363DF'><TbMessage2 size={45}/></App>
        <App bgColor='#EB1D36'><BsFillCameraFill size={40}/></App>
    </QuickBox>
  )
}

export default QuickApp