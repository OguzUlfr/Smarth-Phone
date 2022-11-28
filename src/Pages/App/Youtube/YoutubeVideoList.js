import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {BiSearchAlt2} from 'react-icons/bi'
import { Link } from 'react-router-dom';

const SearchBox = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 10px;
  font-size: 1rem;
  color: #e6e6e6;
  background-color: #343434;
  border: none;
  outline: none;
  border-radius: 6px;
  font-weight: 600;
`;

const SearchButton = styled(BiSearchAlt2)`
  padding: 5px;
  font-size: 2.4rem;
  color: #e6e6e6;
  background-color: #343434;
  border-radius: 50%;
  margin: 0px 10px;
  cursor: pointer;
  &:hover{
    color: #DC3535;
  }
`;

const ListBox = styled.ul`
  width: 100%;
  height: 91%;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    width: 0px;
  }
`;

const ListItem = styled.div`
  width: 380px;
  height: 285px;
  padding: 10px;
  display: flex;
  margin: 10px 0px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const ListItemThumb = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background: url(${props => props.thumbImage}) no-repeat center;
  background-size: cover;
`;

const AboutBox = styled.div`
  width: 100%;
  display: flex;
`;

const ChannelThumb = styled.div`
  width: 50px;
  height: 50px;
  margin: 0px 10px;
  border-radius: 50%;
  background: url('https://yt3.ggpht.com/5Wa2b_nnUKTA9sgP1NOpwqqby8ZICOku_qiEcEWxjnifCOkjkCV4RpxPmv7g3yR4QknGjwwxLA=s88-c-k-c0x00ffffff-no-rj') no-repeat center;
  background-size: cover;
`;


const VideoAbout  =styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const VideoTitle = styled.div`
  width: 100%;
  max-width: 100%;
  height: 20px;
  font-size: 1rem;
  font-weight: 600;
  color: #e6e6e6;
  padding: 2px;
  overflow: hidden;
`;

const DetailBox = styled.div`
  width: 100%;
  padding: 2px;
  max-width: 100%;
  font-size: 0.7rem;
  color: #e6e6e6;
  opacity: 0.7;
`;
const ChannelName = styled.span`
  width: max-content;
  margin: 0px 5px;
`;

function YoutubeVideoList() {
    const [data,setData] = useState();
    const [searchValue,setSearchValue] = useState();

    const searchVideo = () => {
      try {
        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchValue}&type=video&key=AIzaSyBqD-rmmXjPYSM3YSPsvBT2BHPxdineGko`)
        .then(response => {
          setData(response.data.items)
          console.log(response.data.items)
        });
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      try {
        axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=TR&key=AIzaSyBqD-rmmXjPYSM3YSPsvBT2BHPxdineGko')
        .then(response => setData(response.data.items));
      } catch (error) {
        console.log(error);
      }
    },[]);


  return (
    <>  
      <SearchBox>
        <SearchInput placeholder='Search Video' value={searchValue || ''} onChange={e => setSearchValue(e.target.value)}/>
        <SearchButton onClick={searchVideo}/>
      </SearchBox>
      <ListBox>
      {data &&
          data.map( (item, key) => 
          <Link to={typeof item.id === 'string' ? item.id : item.id.videoId} key={key} style={{textDecoration: 'none'}}>
            <ListItem>
              <ListItemThumb  thumbImage={item.snippet.thumbnails.high.url}/>
              <AboutBox>
                <ChannelThumb/>
                <VideoAbout>
                  <VideoTitle>{item.snippet.title}</VideoTitle>
                  <DetailBox>
                    <ChannelName>{item.snippet.channelTitle}</ChannelName>
                  </DetailBox>
                </VideoAbout>
              </AboutBox>
            </ListItem>
          </Link>
        )
      }
      </ListBox>
    </>
    )
}

export default YoutubeVideoList