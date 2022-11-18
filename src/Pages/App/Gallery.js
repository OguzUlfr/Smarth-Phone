import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {AiFillSetting} from 'react-icons/ai'
import { SystemContext,useContext } from '../../Context/SystemContext'

const ImageBox = styled.div`
    width: 100%;
    height: 720px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-left: 5px;
`;

const GridContainer = styled.div`
    columns: 2 50px;
    column-gap: 1rem;
    width: 100%;
    margin: 0 auto;
`;

const ImageCard = styled.div`
    width: 150px;
    margin: 0 0.5rem 0.5rem 0;
    display: inline-block;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    position: relative;
`;

const Images = styled.img`
    width: 100%;
    border-radius: 6px;
`;

const SetBack = styled(AiFillSetting)`
    font-size: 30px;
    padding: 5px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    border-radius: 40px;
    background-color: rgba(0,0,0,0.8);
    cursor: pointer;
    &:hover{
        color: #47B5FF;
    }
`;

function Gallery() {
    const {setBackgroundImage} = useContext(SystemContext);
    const [data,setData] = useState();

    const setBackground = (link) => {
        setBackgroundImage(link);
    }

    useEffect(()=>{
        axios.get('https://api.unsplash.com/photos/?client_id=Cf82jc2n-o8MqiqVfKVYirQvKCy3AFWIwQmci_8FnJU&per_page=20')
        .then(response => {
            setData(response.data);
            console.log(response.data);
        });
    },[]);
  return (
    <ImageBox>
        <GridContainer>
            {data &&
                data.map((item, key) => 
                <ImageCard key={key}>
                    <Images src={item.urls.small} alt=''/>
                    <SetBack onClick={()=>setBackground(item.urls.regular)}/>
                </ImageCard>
                )
            }
        </GridContainer>
    </ImageBox>
  )
}

export default Gallery