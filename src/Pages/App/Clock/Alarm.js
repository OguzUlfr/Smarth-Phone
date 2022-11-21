import React from 'react'
import { useEffect, useState } from 'react'
import { SystemContext,useContext } from '../../../Context/SystemContext';
import {MdOutlineDeleteOutline,MdAlarmAdd} from 'react-icons/md'
import styled from 'styled-components';
import useSound from 'use-sound';
import alarmSound from './alarm.mp3';





const ClockDisplayBox = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`; 

const ClockMain = styled.div`
    width: 80%;
    height: 80%;
    background-color: transparent;
    border-radius: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClockFront = styled.div`
    width: 90%;
    height: 90%;
    border-radius: 100%;
    background: url('https://i.ibb.co/0ZxvWSf/Screenshot-3.png') no-repeat center;
    background-size: contain;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ClockLineBox = styled.div`
    width: 8px;
    height: ${props => props.w || '0'};
    background-color: transparent;
    rotate: z ${props => props.hours * 30 || props.minute * 6 || props.second * 6 || '0'}deg;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
`;

const ClockLine = styled.div`
    width: 100%;
    height: 50%;
    background-color: ${props => props.color || '#fff'};
    margin-top: -10px;
`;

const AlarmBox = styled.ul`
    width: 100%;
    height: 36%;
    list-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const AlarmItem = styled.li`
    width: 90%;
    border-bottom: 1px solid #413F42;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px;
`;

const AlarmTime = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: #D8D9CF;
    text-align: center;
    padding: 5px 10px;
`;
const AlarmDelete = styled(MdOutlineDeleteOutline)`
    font-size: 3rem;
    padding: 10px;
    color: #DD5353;
    cursor: pointer;
    border-radius: 40px;
    &:hover{
        color: #CF0A0A;
        background-color: rgba(0,0,0,0.5);
    }
`;

const AlarmAddButton = styled(MdAlarmAdd)`
    font-size: 3rem;
    padding: 6px;
    position: absolute;
    left: 20px;
    bottom: 10px;
    color: #54B435;
    opacity: 0.6;
    cursor: pointer;
    &:hover{
        opacity: 1;
    }
`;

const AlarmAddCard = styled.div`
    width: 90%;
    height: 340px;
    background-color: red;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #161616;
    border-radius: 8px;
    display: ${props => props.view ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const MainInput = styled.input`
    width: 80%;
    padding: 10px;
    background-color: transparent;
    border: 2px solid #009EFF;
    border-radius: 8px;
    color: #fff;
    position: relative;
    outline: none;
    font-size: 1.5rem;
    font-weight: 600;
`;

const ButtonBox = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
`;

const MainButton = styled.button`
    color: #e6e6e6;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 30px;
    outline: none;
    border: none;
    border-radius: 6px;
    background-color: ${props => props.bgColor || '#000'};
    cursor: pointer;
`;



function Alarm() {
    const {date} = useContext(SystemContext);
    const [clock,setClock] = useState({hours: 0, minute: 0, second: 0});
    const [hoursValue,setHoursValue] = useState();
    const [minuteValue,setMinuteValue] = useState();
    const [modalView,setModalView] = useState(false);
    const [allAlarms,setAllAlarms] = useState(JSON.parse(localStorage.getItem('alarm')) || []);
    const [newDate,setNewDate] = useState();
    const [play] = useSound(alarmSound);

    useEffect(()=>{
        setClock(date);
        setNewDate(date.toString().slice(0,7));
     },[date]);

     useEffect(()=>{
        allAlarms.map((item,key) =>
            {
                if(item.toString() === date.toString().slice(0,7)){
                    alarmOn();
                }
            }
        )
     },[newDate]);

     const handleChange = (e) => {
        if(e.target.name === 'hour'){
            if(e.target.value < 10 && e.target.value >= 0){
                setHoursValue(0 + e.target.value)
            }else if(e.target.value < 24 && e.target.value >= 0){
                setHoursValue(e.target.value)
            }
        }else{
            if(e.target.value < 10 && e.target.value >= 0){
                setMinuteValue(0 + e.target.value)
            }else if(e.target.value < 60 && e.target.value >= 0){
                setMinuteValue(e.target.value)
            }
        }
     }

     const alarmOn = () => {
            play();
     }

     const getAlarm = () => {
        setAllAlarms(JSON.parse(localStorage.getItem('alarm')));
     }

     const addAlarm = () => {
        const alarmItems = `${hoursValue} : ${minuteValue}`;
        if(allAlarms === []){
            localStorage.setItem('alarm',JSON.stringify([alarmItems]));
            getAlarm();
            closeModal();

        }else{
            localStorage.setItem('alarm',JSON.stringify([alarmItems,...allAlarms]));
            getAlarm();
            closeModal();
        }     
    }

    const deleteAlarm = (id) => {
        var filtered = allAlarms.filter(function(value, index){ 
            return index !== id;
        });
        localStorage.setItem('alarm',JSON.stringify(filtered));
        getAlarm();
    }

    const closeModal = () => {
        setHoursValue();
        setMinuteValue();
        setModalView(false);
    }


  return (
    <>
      <ClockDisplayBox>
            <ClockMain>
                <ClockLineBox hours={Number(clock.toString().slice(0,2))} w='98%'><ClockLine w='100%' color='#F2D388'/></ClockLineBox>
                <ClockFront>
                    <ClockLineBox hours={Number(clock.toString().slice(0,2))} w='30%'><ClockLine color='#F2D388'/></ClockLineBox>
                    <ClockLineBox minute={Number(clock.toString().slice(4,7))} w='50%'><ClockLine color='#5F9DF7'/></ClockLineBox>
                    <ClockLineBox second={Number(clock.toString().slice(9,11))} w='60%' style={{width:'3px'}}><ClockLine color='#A62349'/></ClockLineBox>
                </ClockFront>
            </ClockMain>
            <AlarmAddButton onClick={() => setModalView(true)}/>
        </ClockDisplayBox>

        <AlarmBox>
            {allAlarms.length > 0
              ?  allAlarms.map((item,key)=>
                <AlarmItem key={key}>
                    <AlarmTime>{item}</AlarmTime>
                    <AlarmDelete onClick={() => deleteAlarm(key)}/>
                </AlarmItem>)
                : <AlarmItem><AlarmTime>No Alarm</AlarmTime></AlarmItem>
            }
        </AlarmBox>

        <AlarmAddCard view={modalView}>
            <MainInput value={hoursValue || ''} type='number' placeholder='Hours Enter' name='hour' onChange={e => handleChange(e)}/>
            <MainInput value={minuteValue || ''} type='number' placeholder='Minute Enter' name='minute' onChange={e => handleChange(e)}/>
            <ButtonBox>
                <MainButton bgColor='#DC3535' onClick={closeModal}>Close</MainButton>
                <MainButton bgColor='#54B435'  onClick={addAlarm}>ADD</MainButton>
            </ButtonBox>
        </AlarmAddCard>
    </>
  )
}

export default Alarm