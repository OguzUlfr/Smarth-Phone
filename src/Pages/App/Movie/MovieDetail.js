import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import {AiFillStar} from 'react-icons/ai'
import axios from 'axios';

const TopBox = styled.div`
    width: 100%;
    height: 40%;
    position: relative;
`;

const BackPath = styled.div`
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0 60%);
    background: url(${props => props.Thumb}) no-repeat;
    background-size: 150%;
`;

const PosterImage = styled.div`
    width: 140px;
    height: 200px;
    position: absolute;
    bottom: 0px;
    left: 30px;
    background: url(${props => props.Poster}) no-repeat center;
    background-size: contain;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Language = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #DC3535;
    right: 40px;
    bottom: 20px;
    position: absolute;
    color: #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 800;
`;

const AboutBox = styled.div`
    width: 86%;
    height: 56%;
    margin: 20px auto;
    position: relative;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const MovieTitle = styled.div`
    width: 72%;
    padding: 10px 0px;
    font-size: 2rem;
    color: #e6e6e6;
    font-weight: 600;
`;

const MovieTime = styled.span`
    padding: 5px 12px;
    background-color: #F49D1A;
    color: #fff;
    text-align: center;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.8rem;
    position: absolute;
    right: 10px;
    top: 20px;
`;

const Country = styled.div`
    width: 100%;
    padding: 10px 0px;
    font-size: 0.8rem;
    color: #e6e6e6;
    opacity: 0.8;
`;

const GenreBox = styled.div`
    width: 100%;
    padding: 10px 0px;
`;

const GenreItem = styled.span`
    font-size: 0.8rem;
    color: #e6e6e6;
    opacity: 0.7;
    margin-right: 8px;
    cursor: default;
    &:hover{
        opacity: 1;
    }
`;

const StarBox = styled.div`
    width: 100%;
    padding: 10px 0px;
    display: flex;
    align-items: center;
`;

const Star = styled(AiFillStar)`
    color: #F49D1A;
    font-size: 2rem;
`;

const RateBox = styled.span`
    font-size: 1.4rem;
    color: #7F8487;
    margin-left: 20px;
`;

const Rates = styled.span`
    font-size: 1.8rem;
    font-weight: 600;
    color: #F49D1A;
`;

const AboutText = styled.div`
    width: 100%;
    padding: 6px 3px;
    font-size: 1rem;
    color: #e6e6e6;
    opacity: 0.9;
`;

function MovieDetail() {
    const {id} = useParams();
    const [movieData,setMovieData] = useState();
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=737531dc3a50e7f0af4e1671a67226f4`)
        .then(response => {
            setMovieData(response.data)
        });
    },[]);

  return (
    <>
        {movieData &&
        <>
            <TopBox>
                <BackPath Thumb={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}/>
                <PosterImage Poster={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}/>
                <Language>{movieData.original_language.toUpperCase()}</Language>
            </TopBox>
            <AboutBox>
                <MovieTitle>{movieData.title}</MovieTitle>
                <MovieTime>{movieData.runtime} min</MovieTime>
                <Country>{movieData.production_countries[0].name}</Country>
                <GenreBox>
                    {movieData.genres &&
                        movieData.genres.map(item =>
                            <GenreItem>{item.name}</GenreItem>
                        )
                    }
                </GenreBox>
                <StarBox>
                {[...Array(Math.ceil(movieData.vote_average / 2))].map((e, i) => {
                    return <Star/>
                })}
                    <RateBox><Rates>{movieData.vote_average}</Rates>/10</RateBox>
                </StarBox>
                <AboutText>
                {movieData.overview}
                </AboutText>
            </AboutBox>
        </>
        }
    </>
  )
}

export default MovieDetail