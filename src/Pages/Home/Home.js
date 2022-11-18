import styled from 'styled-components'
import Widget from './Components/Widget';
import Apps from './Components/AppGroup'
import QuickApp from './Components/QuickApp';

const HomeBox = styled.div`
    width: 100%;
    height: 100%;
    background : url('https://images.pexels.com/photos/775203/pexels-photo-775203.jpeg?auto=compress&cs=tinysrgb&w=1600') no-repeat center;
    background-size: cover;
    padding: 40px 10px 0px 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
`;


function Home() {

  return (
    <HomeBox>
        <Widget/>
        <Apps/>
        <QuickApp/>
    </HomeBox>
  )
}

export default Home