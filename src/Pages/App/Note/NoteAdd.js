import React, { useState } from 'react'
import styled from 'styled-components'
import {BiSave} from 'react-icons/bi'
import {MdOutlineDeleteSweep} from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';

const TextBox = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 50px 10px 10px 10px;
    font-size: 1rem;
    font-weight: 600;
    color: #c7c7c7;
    resize: none;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const SaveButton = styled(BiSave)`
    font-size: 4rem;
    padding: 10px;
    border-radius: 50%;
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: #68B984;
    background-color: #1a1a1a;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    cursor: pointer;
`;

const DeleteButton = styled(MdOutlineDeleteSweep)`
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 2rem;
    color: #DC3535;
`;

function NoteAdd() {
    const {id} = useParams();
    const [inputValue,setInputValue] = useState(id === 'new' ? '' : JSON.parse(localStorage.getItem('notes'))[id]);

    const saveNote = () => {
        if(localStorage.getItem('notes')){
            const filtered = JSON.parse(localStorage.getItem('notes')).filter( (item,key) =>{
                return ( key !== id)
                    } 
                )
            localStorage.setItem('notes', JSON.stringify([inputValue,...filtered]));
        }else{
            localStorage.setItem('notes',JSON.stringify([inputValue]));
        }
    }


    const deleteNote = () => {
        if(JSON.parse(localStorage.getItem('notes')).length !== 1){
            const filtered = JSON.parse(localStorage.getItem('notes')).filter( (item,key) =>{
                return ( item !== inputValue)
                } 
            )
            localStorage.setItem('notes', JSON.stringify(filtered));
        }else{
            localStorage.removeItem('notes');
        }
    }

  return (
    <>
        <TextBox value={inputValue || ''} onChange={e => setInputValue(e.target.value)} placeholder='Write Note'/>
        <Link to='/App/Note/'><SaveButton onClick={saveNote}/></Link>
        <Link to='/App/Note/'><DeleteButton onClick={deleteNote}/></Link>
    </>
  )
}

export default NoteAdd