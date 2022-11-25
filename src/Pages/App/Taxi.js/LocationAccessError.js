import React from 'react'
import styled from 'styled-components'

const ErrorMessageBox = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorMessageImage = styled.img`
    width: 70%;
`;

const ErrorMessageText = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 2rem;
    text-align: center;
    font-weight: 600;
    color: #F49D1A;
    margin-top: 10%;
`;

function LocationAccessError() {
  return (
    <>
        <ErrorMessageBox>
        <ErrorMessageImage src='https://i.ibb.co/F7TPknd/navigation.png'/>
        </ErrorMessageBox>
        <ErrorMessageText>Please give location permission and restart the application.</ErrorMessageText>
    </>
  )
}

export default LocationAccessError