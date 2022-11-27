import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const ListBox = styled.div`
    width: 100%;
    height:100%;
    display: grid;
    grid-template-columns: auto auto;
    padding-top: 10px;
    gap: 20px;
    place-items: center;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const ListItem = styled.div`
    width: 160px;
    height: 240px;
    background: url(${props => props.poster}) no-repeat center;
    background-size: contain;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    &:hover{
        background-size: 105%;
    }
    &:hover #bottomBox{
        bottom: 0px;
    }
`;

const AboutBox = styled.div`
    width: 100%;
    height: 50px;
    background-color: rgba(0,0,0,0.8);
    position: absolute;
    bottom: -60px;
    transition: 0.3s;
    padding: 5px 5px;
`;

const Title = styled.div`
    width: 80%;
    height: 50%;
    overflow: hidden;
    font-size: 1rem;
    font-weight: 600;
    color: #e6e6e6;
`;

const ReleaseDate = styled.div`
    width: 80%;
    color: #e6e6e6;
    font-size: 0.6rem;
    height: 50%;
    display: flex;
    align-items: center;
`;

const Rate = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #DC3535;
    color: #e6e6e6;
    position: absolute;
    right: 5px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
`;

function MovieList() {
    const [listData,setListData] = useState();
  
    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=737531dc3a50e7f0af4e1671a67226f4')
        .then(response => setListData(response.data.results));
    },[]);
  
    return (
    <ListBox>
        {listData &&
            listData.map( (item, key) =>
            <Link to={`/App/Movie/${item.id}`} key={key}>
                <ListItem poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}>
                    <AboutBox id='bottomBox'>
                        <Title>{item.original_title}</Title>
                        <ReleaseDate>Release Date : {item.release_date}</ReleaseDate>
                        <Rate>{item.vote_average}</Rate>
                    </AboutBox>
                </ListItem> 
            </Link>      
            )
        }
    </ListBox>
  )
}

export default MovieList