import React, { useEffect, useState} from 'react'
import styled from 'styled-components'
import {BsPlayFill,BsPauseFill} from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {SystemContext, MusicContext, useContext} from '../../../Context/SystemContext';


const SearchTitle = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 1.6rem;
    font-weight: 600;
    color: #e6e6e6;
    text-align: center;
`;

const ListBox = styled.ul`
    width: 100%;
    height: 92%;
    padding: 10px;
    list-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const ListItem = styled.li`
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0px;
`;

const ListItemImageBox = styled.div`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #2C3333;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    left: 0%;
`;

const ListItemImage = styled.div`
    width: 96px;
    height: 96px;
    background: url(${props => props.thumb || '#fff'}) no-repeat center;
    background-size: contain;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const ListItemAboutBox = styled.div`
    width: 76%;
    height: 80px;
    background-color: #2C3333;
    position: absolute;
    z-index: 0;
    left: 24%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #e6e6e6;
    overflow: hidden;
    user-select: none;
`;

const ListItemTitle = styled.div`
    width: 70%;
    padding: 10px 0px;
    margin-left: 10%;
    font-size: 12px;
    overflow: hidden;
    font-weight: 600;
`;

const ListItemAlbum = styled.div`
    width: 40%; 
    padding: 10px 0px;
    margin-left: 10%;
    font-size: 10px;
    overflow: hidden;
    font-weight: 400;
    opacity: 0.7;
`;

const ListItemArtist = styled.div`
    width: 22%; 
    padding: 10px 0px;
    font-size: 10px;
    overflow: hidden;
    text-align: end;
    font-weight: 600;
    opacity: 0.9;
`;

const ControllBox = styled.div`
    width: 20%;
    height: 100%;
    position: absolute;
    right: 0px;
`;

const PlayButton = styled(BsPlayFill)`
    width: 100%;
    height: 100%;
    color: #4361EE;
    cursor: pointer;
`; 
const PauseButton = styled(BsPauseFill)`
    width: 100%;
    height: 100%;
    color: #4361EE;
    cursor: pointer;
`; 

function MusicList() {
    const {searchKey} = useParams();
    const {volume} =  useContext(SystemContext);
    const {music,setMusic} = useContext(MusicContext);
    const [musicData,setData] = useState();

    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
            params: {q: searchKey},
            headers: {
              'X-RapidAPI-Key': '92993c09c4msh5d6c346b37f5514p1c4737jsnf3dd164b7c82',
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            setData(response.data.data);
          }).catch(function (error) {
              console.error(error);
          });
    },[]);

    const runMusic = (preview) => {
        setMusic(new Audio(preview));
        music && music.pause();
    }


    useEffect(()=>{
        if(music){
            music.play() 
            music.volume = parseFloat(volume / 100)
        } 
    },[music,volume]);


    
    const stopMusic = () => {
        music.pause();
        setMusic(false);
    }

  return (
    <>
        <SearchTitle>{searchKey.trim()}</SearchTitle>
        <ListBox>
        {musicData &&
               musicData.map((item,key) => 
                <ListItem key={key}>
                    <ListItemImageBox>
                        <ListItemImage thumb={item.album.cover_medium}/>
                    </ListItemImageBox>
                    <ListItemAboutBox>
                        <ListItemTitle>{item.title_short}</ListItemTitle>
                        <ControllBox>
                            {music.src === item.preview
                                ?<PauseButton onClick={() => stopMusic(item.preview)}/>
                                :<PlayButton onClick={() => runMusic(item.preview)}/>
                            }
                        </ControllBox>
                        <ListItemAlbum>{item.album.title}</ListItemAlbum>
                        <ListItemArtist>{item.artist.name}</ListItemArtist>
                    </ListItemAboutBox>
                </ListItem>
                )
            }
        </ListBox>
    </>
  )
}

export default MusicList