import styled from 'styled-components'
import {BiAlarm,BiStopwatch,BiTimer} from 'react-icons/bi'
import { NavLink,Outlet } from 'react-router-dom';

const ClockContentBox = styled.div`
    width: 100%;
    height: 660px;
`; 

const BottomGroup = styled.ul`
  width: 100%;
  height: 72px;
  margin-top: 10px;
  display: flex;
`;

const ButtonBox = styled(NavLink)`
  width: 100%;
  height: 72px;
  margin: 0px 10px;
  outline: none;
  border: none;
  color: #e6e6e6;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
`;

function Clock() {
  return (
    <ClockContentBox>
        <Outlet/>
        <BottomGroup>
          <ButtonBox to=''>
            <BiAlarm size={32}/>
            Alarm
          </ButtonBox>
          <ButtonBox to='stopwatch'>
            <BiStopwatch size={32}/>
            StopWatch
          </ButtonBox>
          <ButtonBox to='timer'>
            <BiTimer size={32}/>
            Timer
          </ButtonBox>
        </BottomGroup>

    </ClockContentBox>
  )
}

export default Clock