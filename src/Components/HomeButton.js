import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import {HiOutlineHome} from 'react-icons/hi'
import { SystemContext, MusicContext ,useContext } from '../Context/SystemContext'
import {Link} from 'react-router-dom'

const ButtonBox = styled.button`
    width: 80px;
    height: 40px;
    background-color: #171717;
    position: absolute;
    display: ${props => props.display ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    z-index: 2;
    border-radius: 50% 50% 25% 25% / 100% 100% 0% 0%;
    cursor: pointer;
`;

const HomeIcon = styled(HiOutlineHome)`
    width: 100%;
    height:100%;
    padding: 10px;
    color: #e6e6e6;
    &:hover{
        padding: 8px;
        color: #EC255A;
    }
`;

function HomeButton() {
    const {power} = useContext(SystemContext);
    const {music,setMusic} = useContext(MusicContext);
    const [button,setButton] = useState(false);
    
    useEffect(()=>{
        if(power){
            setTimeout(() => {
                setButton(true);
            }, 3000);
        }
        else{
            setButton(false);
        }
    },[power]);

    const closeMusic = () => {
        music && music.pause();
        setMusic(false);
    }

  return (
    <Link to='/' onClick={closeMusic}>
        <ButtonBox display={button}>
            <HomeIcon/>
        </ButtonBox>
    </Link>
    
  )
}

export default HomeButton