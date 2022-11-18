import styled from 'styled-components'
import Widget from './Components/Widget';
import Apps from './Components/AppGroup'
import QuickApp from './Components/QuickApp';
import { SystemContext,useContext } from '../../Context/SystemContext';

const HomeBox = styled.div`
    width: 100%;
    height: 100%;
    background : url(${props => props.bgImage}) no-repeat center;
    background-size: cover;
    padding: 40px 10px 0px 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
`;


function Home() {
  const {backgroundImage} = useContext(SystemContext);

  return (
    <HomeBox bgImage={backgroundImage}>
        <Widget/>
          <Apps/>
        <QuickApp/>
    </HomeBox>
  )
}

export default Home