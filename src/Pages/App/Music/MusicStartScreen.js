import React, { useEffect, useRef, useState } from 'react'
import styled, {keyframes} from 'styled-components'
import {IoArrowForwardCircle} from 'react-icons/io5'
import {IoMdMusicalNote} from 'react-icons/io'
import {Link} from 'react-router-dom'



const AnimBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    position:absolute;
    z-index: 1;
    background-color: #1a1a1a;
`;

const TextFade = keyframes`
    0%{opacity: 0;}
    75%{opacity:1;}
    100%{opacity:0;}
`;


const HelloText = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
    text-align: center;
    font-size: 3rem;
    font-weight: 600;
    background: #439CFB;
    background: linear-gradient(to right, #439CFB 0%, #F187FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${TextFade} 3s;
`;

const SearchText = styled(HelloText)`
    animation-delay: 2.98s;
    font-size:2rem;
`;

const SearchBox = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
`;

const LogoBox = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    align-items : center;
    justify-content: center;
`;

const MusicLogo = styled(IoMdMusicalNote)`
    font-size: 12rem;
    color: #e6e6e6;
    background: #4361EE;
    border-radius: 50%;
    padding: 20px;
`;

const InputBox = styled.div`
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchInput = styled.input`
    width: 240px;
    padding: 10px 20px;
    background: transparent;
    border: none;
    border-radius: 6px;
    outline:none;
    color: #e6e6e6;
    font-size: 1.2rem;
    font-weight: 600;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const SearchButton = styled(IoArrowForwardCircle)`
    color: #4361EE;
    opacity : 0.6;
    font-size: 3.5rem;
    margin-left: 10px;
    cursor: pointer;
    &:hover{
        opacity : 1;
    }
`;

function MusicStartScreen() {
    const [searchValue,setSearchValue] = useState();
    const AnimationBox = useRef();
    const TextOne = useRef();
    const TextTwo = useRef();

    useEffect(()=>{
        setTimeout(() => {
            TextOne.current.style.display = 'none';
            TextTwo.current.style.display = 'flex';
        }, 3000);
        setTimeout(() => {
            AnimationBox.current.style.display = 'none';
        }, 5950);
    },[]);

  return (
    <>
    <AnimBox ref={AnimationBox}>
    <HelloText ref={TextOne}>HELLO</HelloText>
    <SearchText ref={TextTwo}>Start searching for the song you want</SearchText>
    </AnimBox>
    <SearchBox>
        <LogoBox>
            <MusicLogo/>
        </LogoBox>
        <InputBox>
            <SearchInput placeholder='Music, Album, Artist...' value={searchValue || ''} onChange={e => setSearchValue(e.target.value)}/>
            <Link to={searchValue}><SearchButton/></Link>
        </InputBox>
    </SearchBox>
    </>
  )
}

export default MusicStartScreen