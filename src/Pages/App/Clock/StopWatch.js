import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {HiPencilAlt} from 'react-icons/hi'
import {BsFillPlayFill,BsArrowRepeat,BsFillPauseFill} from 'react-icons/bs'
import {MdOutlinedFlag} from 'react-icons/md'

const StopWatchBox = styled.div`
    width: 100%;
    height: 96%;
`;

const WatchDisplay = styled.div`
    width:100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: 600;
    color: #FFB200;
    letter-spacing: 2px;
`;

const WatchControllBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SplitButton = styled(HiPencilAlt)`
    padding: 10px;
    font-size: 3.5rem;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50px;
    opacity: 0.7;
    &:hover{
        opacity: 1;
        color: #FFB200;
    }
`;

const PlayButton = styled(BsFillPlayFill)`
    font-size: 4.5rem;
    padding: 10px;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50px;
    margin: 0px 16px;
    opacity: 0.7;
    &:hover{
        opacity: 1;
        color: #FFB200;
    }
`;

const PauseButton = styled(BsFillPauseFill)`
    font-size: 4.5rem;
    padding: 10px;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50px;
    margin: 0px 16px;
    opacity: 0.7;
    &:hover{
        opacity: 1;
        color: #FFB200;
    }
`;

const ResetButton = styled(BsArrowRepeat)`
    padding: 10px;
    font-size: 3.5rem;
    cursor: pointer;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50px;
    opacity: 0.7;
    &:hover{
        opacity: 1;
        color: #FFB200;
    }
`;

const SplitList = styled.ul`
    width: 100%;
    height: 45%;
    padding: 5% 20px;
    margin-top: 5%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        width: 0px;
    }
`;

const ListItem = styled.li`
    width: 100%;
    padding: 5px 10px;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: #e6e6e6;
`;

const ListItemIcon = styled(MdOutlinedFlag)`
    font-size: 1.3rem;
    color: #FFB200;
    margin: 0px 10px;
`;


function StopWatch() {
    const [runs,setRuns] =useState(false);
    const [currentTime,setCurrentTime] = useState({hours:0,minute:0,second:0,milisecond:0});
    const [interv,setInterv] = useState();
    const [splitTime,setSplitTime] = useState([{hours:0,minute:0,second:0,milisecond:0}]);
    const [splitList,setSplitList] = useState();

    var updateH = currentTime.hours , updateM = currentTime.minute, updateS = currentTime.second, updateMS = currentTime.milisecond;

    useEffect(()=>{
        setSplitList(JSON.parse(sessionStorage.getItem('split_time')));
    },[splitTime]);


    const run = () => {
        if(updateS > 59){
            updateM++;
            updateS = 0;
        }
        if(updateM > 59){
                updateH++;
                updateM = 0;
        }
        if(updateMS > 100){
            updateS++;
            updateMS = 0;
        }
        updateMS++;
        return setCurrentTime({hours:updateH,minute:updateM,second:updateS,milisecond:updateMS});
    }

    const Start = () => {
        run();
        setInterv(setInterval(run, 10));
        setRuns(true);
    }

    const Stop = () => {
        clearInterval(interv);
        setRuns(false);
    }

    const Reset = () => {
        if(runs){
            Stop();
            setSplitList();
            sessionStorage.removeItem('split_time');
            setCurrentTime({hours:0,minute:0,second:0,milisecond:0});
            setSplitTime({hours:0,minute:0,second:0,milisecond:0});
        }else{
            setSplitList();
            sessionStorage.removeItem('split_time');
            setCurrentTime({hours:0,minute:0,second:0,milisecond:0});
            setSplitTime({hours:0,minute:0,second:0,milisecond:0});
        }
    }

    const splitAdd = () => {
      
        if(JSON.parse(sessionStorage.getItem('split_time'))){
            const splitTimeItem = {
                hours: currentTime.hours - splitTime.hours,
                minute: currentTime.minute - splitTime.minute,
                second: currentTime.second - splitTime.second,
                milisecond: currentTime.milisecond - splitTime.milisecond
            };
            sessionStorage.setItem('split_time',JSON.stringify([splitTimeItem,...JSON.parse(sessionStorage.getItem('split_time'))]));
            setSplitTime(currentTime);

        }else{
            const splitTimeItem = {
                hours: currentTime.hours - splitTime.hours,
                minute: currentTime.minute - splitTime.minute,
                second: currentTime.second - splitTime.second,
                milisecond: currentTime.milisecond - splitTime.milisecond
            };
            sessionStorage.setItem('split_time',JSON.stringify([splitTimeItem]));
            setSplitTime(splitTimeItem);
        }
    }


  return (
    <StopWatchBox>
        <WatchDisplay>
            {currentTime.hours < 10 ? `0${currentTime.hours}` : currentTime.hours}:
            {currentTime.minute < 10 ? `0${currentTime.minute}` : currentTime.minute}:
            {currentTime.second < 10 ? `0${currentTime.second}` : currentTime.second}:
            {currentTime.milisecond.toString().slice(0,1)}s
        </WatchDisplay>
        <WatchControllBox>
            <SplitButton onClick={splitAdd}/>
            {runs
                ?<PauseButton onClick={Stop}/>
                :<PlayButton onClick={Start}/>
            }
            <ResetButton onClick={Reset}/>
        </WatchControllBox>
        <SplitList>
            {splitList
            ? splitList.map((item, key)=> 
                <ListItem key={key}>
                    <ListItemIcon/>
                    {item.hours < 10 ? `0${item.hours}` : item.hours}:
                    {item.minute < 10 ? `0${item.minute}` : item.minute}:
                    {item.second < 10 ? `0${item.second}` : item.second}:
                    {item.milisecond < 0 ? 0 : item.milisecond < 10 ? `0${item.milisecond}` : item.milisecond}s
                </ListItem>
                )
            :   <ListItem><ListItemIcon/>No Time</ListItem>
            }
            
        </SplitList>
    </StopWatchBox>
  )
}

export default StopWatch