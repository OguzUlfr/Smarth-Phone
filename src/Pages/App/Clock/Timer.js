import { useEffect, useState } from 'react';
import styled from 'styled-components'
import {breatheAnimation} from './TimerAnim'
import {VscDebugStart} from 'react-icons/vsc'
import {MdOutlineRestartAlt} from 'react-icons/md'

const TimerBox = styled.div`
  width: 100%;
  height: 96%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const DisplayBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;


const ClokBack = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 50%;
  animation: ${breatheAnimation} ${props => props.times}s linear;
  transition: 0.5s;
`;


const ClockFront = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: #1a1a1a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  color: #FB3640;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const MainInput = styled.input`
  width: 160px;
  padding: 8px 4px;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 8px;
  color: #FB3640;
  text-align: center;
  box-shadow: 0px 0px 16px 2px rgba(251,54,64,0.16);
`;

const MainButton = styled.button`
  width: 120px;
  padding: 8px 4px;
  font-size: 1.6rem;
  font-weight: 600;
  background-color: ${props => props.color || '#gray'};
  border: none;
  outline: none;
  border-radius: 8px;
  color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
  cursor: pointer;
`;

function Timer() {
  const [time,setTime] = useState(0);
  const [hoursValue,setHoursValue]= useState(0);
  const [minuteValue,setMinuteValue]= useState(0);
  const [interv,setInterv] = useState();
  const [imputAccess,setInputAccess] = useState(false);
  const [timer,setTimer] = useState({hours:0,minute:0,second:0});

  var updateH = timer.hours , updateM = timer.minute, updateS = timer.second;

  const handleChangeHours = (e)=> {
    setHoursValue(e.target.value)
    
  }
  const handleChangeMinute = (e)=> {
    setMinuteValue(e.target.value)
    
  }

  useEffect(()=>{
    setTimer({hours:hoursValue,minute:minuteValue,second:0});
  },[hoursValue,minuteValue]);

  const addTime = () => {
    setTime((timer.hours * 3600 ) + (timer.minute * 60));
    run();
    setInterv(setInterval(run, 1000));
    setInputAccess(true);
  }

  const run = () => {
    updateS--;
    if(updateS < 0){
        updateM--;
        updateS = 59;
    }
    if(updateM < 0){
            updateH--;
            updateM = 59;
    }
    return setTimer({hours:updateH,minute:updateM,second:updateS});
  }

  
  useEffect(()=>{
    if(timer.hours < 1 && timer.minute < 1 && timer.second < 1){
      clearInterval(interv);
      setInputAccess(false);
    }
  },[timer]);

  const reset = () => {
      clearInterval(interv);
      setInputAccess(false);
      setTimer({hours:0,minute:0,second:0});
      setTime(0);
      setHoursValue(0);
      setMinuteValue(0);
  }

  return (
    <TimerBox>
        <DisplayBox>
          {time > 0 &&
            <ClokBack times={time}/>
          }
          <ClockFront>
            {timer.hours < 10 ? "0"+timer.hours : timer.hours}:
            {timer.minute < 10 ? "0"+timer.minute : timer.minute}:
            {timer.second < 10 ? "0"+timer.second : timer.second}
          </ClockFront>
        </DisplayBox>
        <InputBox>
          <MainInput disabled={imputAccess} name='hours' value={hoursValue} type='number' onChange={e => handleChangeHours(e)} placeholder='Hours'/>
          <MainInput disabled={imputAccess} name='minute' value={minuteValue} type='number' onChange={e => handleChangeMinute(e)} placeholder='Minute'/>
        </InputBox>
        <MainButton color='#282A3A' onClick={reset}><MdOutlineRestartAlt/></MainButton>
        <MainButton color='#6D9886' onClick={addTime}><VscDebugStart/></MainButton>
    </TimerBox>
  )
}

export default Timer