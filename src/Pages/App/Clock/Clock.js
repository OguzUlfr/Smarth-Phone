import styled from 'styled-components'
import Alarm from './Alarm'; 

const ClockContentBox = styled.div`
    width: 100%;
    height: 660px;
`; 


function Clock() {
  return (
    <ClockContentBox>
        <Alarm/>
    </ClockContentBox>
  )
}

export default Clock