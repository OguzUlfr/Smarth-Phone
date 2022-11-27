import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {RiShoppingBag3Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom';

const ListTitle = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    color: #EA5455;
`;

const List = styled.ul`
    width: 100%;
    height: 92%;
    list-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const ListItem = styled.li`
    width: 80%;
    height: 100px;
    margin: 42px auto;
    display: flex;
    align-items: center;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const ListItemAbout = styled.div`
    width: 70%;
    height: 100%;
`;

const ListItemImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 12px;
    background: url(${props => props.image || 'https://i.ibb.co/NZvFSNq/Screenshot-3.png'}) no-repeat center;
    background-size: contain;
`;

const ListItemTitle = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: #e6e6e6;
    padding: 10px;
    width: 100%;
    max-height: 30px;
    overflow: hidden;
`;

const ListItemRate = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 0.8rem;
    color: #e6e6e6;
    opacity: 0.8;
`;

const ListItemPrice = styled.div`
    position: absolute;
    width: 20%;
    height: 20%;
    font-size: 1rem;
    color: #F07B3F;
    right: 100px;
    bottom: 26px;
`;

const ListItemButton = styled.button`
    width: 100px;
    height: 24px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border: 1px solid transparent;
    border-bottom: 1px solid #1FAB89;
    outline: none;
    background-color: transparent;
    color: #e6e6e6;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background-color: #1FAB89;
        border: 1px solid #1FAB89;
        border-radius: 4px;
    }
`;

const BasketIcon = styled(RiShoppingBag3Fill)`
    position: absolute;
    right: 10px;
    top: 6px;
    padding: 5px;
    font-size: 3rem;
    color: #00A8CC;
    cursor: pointer;
`;

export default function FoodList() {
    const [listData,setListData] = useState();

    useEffect(()=>{
            axios.get(`https://ig-food-menus.herokuapp.com/best-foods`)
            .then(response => setListData(response.data));
    },[]);

    const addBasket = (title,img,price) => {
        if(!localStorage.getItem('basket')){
            localStorage.setItem('basket',JSON.stringify([{title:title,image:img,price:price}]));
        }else{
            localStorage.setItem('basket',JSON.stringify([{title:title,image:img,price:price},...JSON.parse(localStorage.getItem('basket'))]));
        }
    }

  return (
    <>
        <ListTitle>Food List</ListTitle>
        <List>
            {listData &&
                listData.map((item,key) =>
                <ListItem key={key}>
                    <ListItemAbout>
                        <ListItemTitle>{item.dsc}</ListItemTitle>
                        <ListItemRate>Rate : {item.rate}</ListItemRate>
                        <ListItemPrice>${item.price}</ListItemPrice>
                        <ListItemButton onClick={e => addBasket(item.dsc,item.img,item.price)}>Add to card</ListItemButton>
                    </ListItemAbout>
                    <ListItemImage image={item.img}/>
                </ListItem>   
                )
            }
        </List>
        <Link to='basket'><BasketIcon/></Link>
    </>
  )
}
