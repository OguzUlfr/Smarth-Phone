import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {MdOutlineDelete} from 'react-icons/md'
import {BsBagCheckFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const BasketBox = styled.ul`
    width: 100%;
    height: 92%;
    overflow-y: scroll;
    list-style: none;
    ::-webkit-scrollbar{
        width: 0px;
    }
`;

const NoBasketItem = styled.div`
    width: 100%;
    font-size: 2.3rem;
    text-align: center;
    font-weight: 600;
    color: #e6e6e6;
    opacity: 0.4;
    margin-top: 70%;
`;

const BasketListItem = styled.li`
    width: 90%;
    height: 120px;
    padding: 20px 10px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #3C4048;

`;

const BasketListItemImage = styled.img`
    height: 100%;
    border-radius: 8px;
    margin-right: 10px;
`;

const BasketListItemAbout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const BasketListItemTitle = styled.div`
    max-width: 88%;
    overflow: hidden;
    font-size: 1rem;
    font-weight: 600;
    color: #e6e6e6;
    padding: 5px;
    max-height: 24px;
`;

const BasketListItemPrice = styled.div`
    width: 80%;
    padding: 5px;
    font-size: 1.4rem;
    color: #54B435;
`;

const BasketListItemDelete = styled(MdOutlineDelete)`
    color: #E64848;
    font-size: 3rem;
    padding: 5px;
    position:absolute;
    right: 2px;
    cursor: pointer;
    &:hover{
        color: #FF1E00;
    }
`;

const BottomGrouop = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
`;

const CompleteButton = styled(Link)`
    width: 180px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0px auto;
    border: none;
    background-color: #68B984;
    border-radius: 8px;
    font-size: 1.02rem;
    font-weight: 600;
    color: #2C3333;
    cursor: pointer;
    text-decoration: none;
`;

const CompletePrice = styled.span`
    width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0px auto;
    border: none;
    background-color: #68B984;
    border-radius: 8px;
    font-size: 1.02rem;
    font-weight: 600;
    color: #C84B31;
`;

function FoodBasket() {
    const [totalPrice,setTotalPrice] = useState(0);
    const [basketItem,setBasketItem] = useState();

    useEffect(()=>{
        setBasketItem(JSON.parse(localStorage.getItem('basket')));
    },[basketItem]);

    
    useEffect(()=>{
        setTotalPrice(0);
            if(basketItem){
                basketItem.map((item) =>
                setTotalPrice((totalPrice) => totalPrice + item.price)
             )
            }
    },[basketItem]);


    const deleteBasket = (id) => {
        if(basketItem.length < 2){
            localStorage.removeItem('basket');
        }else{
            const filteredBasket = basketItem.filter((item,key) =>
                {
                    return key !== id;
                }
            );
            localStorage.setItem('basket',JSON.stringify(filteredBasket));
        }
    }

    const completeOrder = () => {
        localStorage.removeItem('basket');
    }

  return (
    <>
        <BasketBox>
            {basketItem 
               ? basketItem.map((item,key) =>
                <BasketListItem key={key}>
                    <BasketListItemImage src={item.image}/>
                    <BasketListItemAbout>
                        <BasketListItemTitle>{item.title}</BasketListItemTitle>
                        <BasketListItemPrice>${item.price}</BasketListItemPrice>
                    </BasketListItemAbout>
                    <BasketListItemDelete onClick={() => deleteBasket(key)}/>
                </BasketListItem>
                )
                :<NoBasketItem>Basket is empty</NoBasketItem>
            }
        </BasketBox>
        <BottomGrouop>
            <CompleteButton to='/App/Food'  onClick={completeOrder}><BsBagCheckFill size={20}/>Complete Order</CompleteButton>
            <CompletePrice>${totalPrice}</CompletePrice>
        </BottomGrouop>
    </>
  )
}

export default FoodBasket