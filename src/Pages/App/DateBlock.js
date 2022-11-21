import React from 'react'
import { useState,useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import {RiAddCircleLine} from 'react-icons/ri'

const ActivityBox = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0px 10px;
  position: relative;
`;

const Title = styled.p`
  width: 30%;
  padding: 20px 0px;
  font-weight: 600;
  color: #e6e6e6;
  opacity: 0.8;
`;

const Line = styled.hr`
  width: 100%;
  height: 10px;
  border-radius: 3px;
  border: none;
  background-color: #212121;
`;

const ActivityList = styled.ul`
  width: 100%;
  height: 100%;
  list-style: disc;
  list-style-position: inside;
`;

const ListItem = styled.li`
  width: 100%;
  padding: 5px;
  font-weight: 600;
  color: #e6e6e6;
`;

const ActivityAddBox = styled.div`
  width: 320px;
  height: 350px;
  background-color: rgba(0,0,0,0.3);
  position: absolute;
  padding: 0px 20px;
  z-index: 3;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 26px -6px rgba(220,40,40,1);
  display: ${props => props.view ? 'block' : 'none'};
`;

const AddBoxTitle = styled.div`
  width: 100%;
  padding: 20px 0px;
  font-weight: 600;
  color: #e6e6e6;
`;

const AddInput = styled.input`
  width: 100%;
  padding: 10px;
  color: #e6e6e6;
  margin: 40px 0px;
  border-radius: 8px;
  border: 1px solid #676767;
  background: #1a1a1a;
  outline: none;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  font-size: 1rem;
  background-color: #54B435;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right:10px;
  color: #e6e6e6;
`;

const CloseButton = styled(SubmitButton)`
  background-color: #D2001A;
`;

const AddButton = styled(RiAddCircleLine)`
  color: #F05454;
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  right: 30px;
  bottom: -180px;
  z-index: 3;
  &:hover{
    filter: drop-shadow(0px 0px 2px #F05454);
  }
`;

function DateBlock() {
    const [value, onChange] = useState(new window.Date());
    const [inputValue,setInputValue] = useState('');
    const [activity,setActivity] = useState([]);
    const [modalView,setModalView] = useState(false);

    useEffect(()=>{
      setActivity(JSON.parse(localStorage.getItem('activitys')));
    },[inputValue]);


    const closeModal = () => {
      setInputValue('');
      setModalView(false);
    }

    const AddActivity = () => {
      if(activity){
        localStorage.setItem('activitys', JSON.stringify([...activity,{
          date: value.toString().slice(4,15),
          text: inputValue
        }]));
        closeModal();
      }else{
        localStorage.setItem('activitys', JSON.stringify([{
          date: value.toString().slice(4,15),
          text: inputValue
        }]));
        closeModal();
      }
      
    }

    useEffect(()=>{
      setActivity(JSON.parse(localStorage.getItem('activitys')));
    },[value]);
    
  return (
    <>
      <Calendar onChange={onChange} showWeekNumbers={false} locale='en-EN' value={value} weekNumber={false}/>
      <ActivityBox>
        <Line/>
        <Title>Activity</Title>
        <ActivityList>
          {activity &&
              activity.filter(function (el) {
                return el.date === value.toString().slice(4,15)
              }).map((item,key)=> 
                <ListItem key={key}>{item.text}</ListItem>
              )
          }
        </ActivityList>
        <AddButton  onClick={()=>setModalView(true)}/>
      </ActivityBox>  
      <ActivityAddBox view={modalView}>
          <AddBoxTitle>Add Activity</AddBoxTitle>
          <AddInput placeholder='Activity' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
          <AddBoxTitle style={{padding:'5px 0px'}}>Date</AddBoxTitle>
          <Title style={{width: '80%',padding:'30px 0px'}}>{value.toString().slice(4,15)}</Title>
          <CloseButton onClick={closeModal}>Close</CloseButton>
          <SubmitButton onClick={AddActivity}>ADD</SubmitButton>
      </ActivityAddBox>
    </>
  )
}

export default DateBlock