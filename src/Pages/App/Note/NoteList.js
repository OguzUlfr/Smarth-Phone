import React, { useState } from 'react'
import styled from 'styled-components'
import {TiFilter} from 'react-icons/ti'
import {MdPostAdd} from 'react-icons/md'
import { Link } from 'react-router-dom'




const TopBar = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 10px;
    position: relative;
`;

const FilterInput = styled.input`
    width: 60%;
    padding: 10px 10px 10px 36px;
    background-color: #343434;
    border: none;
    border-radius: 6px;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    color: #e6e6e6;
`;

const FilterIcon = styled(TiFilter)`
    font-size: 1.6rem;
    position: absolute;
    color: #b3b3b3;
    left: 40px;
`;

const AddButton = styled(MdPostAdd)`
    font-size: 3rem;
    color: #68B984;
    cursor: pointer;
    margin: 0px 8px;
`;

const List = styled.ul`
    width: 100%;
    height: 90%;
    padding: 20px;
    list-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const ListItem = styled.li`
    width: 90%;
    height: 60px;
    border-radius: 8px;
    background-color: #393939;
    margin: 10px auto;
    cursor: pointer;
    padding: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: #c7c7c7;
    overflow: hidden;
    box-shadow: inset 0px 0px 0px 4px #393939;
    &:hover{
        background-color: #343434;
    }
`;

const NoNoteTextBox = styled.li`
    width: 80%;
    height: 60px;
    color: #393939;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    font-size: 2.4rem;
    margin: 70% auto;
`;

const ListItemText = styled.div`
    width: max-content;
    padding: 10px;
`;

function NoteList() {
    const [allNote,setAllNote] = useState(JSON.parse(localStorage.getItem('notes')));

    const filterNotes = (e) => {
        
        const filteredItem = JSON.parse(localStorage.getItem('notes')).filter(item => {
            return item.toLowerCase().includes(e.target.value.toLowerCase());
            } 
        )
        setAllNote(filteredItem);
    }

  return (
        <>
        <TopBar>
            <FilterIcon/>
            <FilterInput placeholder='Filter Note' onChange={filterNotes}/>
            <Link to='new'><AddButton/></Link>
        </TopBar>
        <List>
           {
            allNote 
               ? allNote.map( (item,key) =>
                    <Link to={`/App/Note/${key}`} style={{textDecoration : 'none'}} key={key}>
                        <ListItem>
                            <ListItemText>
                                {item}
                            </ListItemText>
                        </ListItem>
                    </Link>
                )
                :<NoNoteTextBox>No Note</NoNoteTextBox>
           }
        </List>
        </>
  )
}

export default NoteList