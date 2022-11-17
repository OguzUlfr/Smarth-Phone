import {BiCalendar,BiAlarm,BiEqualizer} from 'react-icons/bi'
import {BsImages} from 'react-icons/bs'
import {RiTaxiFill,RiMovie2Line} from 'react-icons/ri'
import {MdOutlineStickyNote2,MdFastfood} from 'react-icons/md'
import {FaYoutube} from 'react-icons/fa'
import {TiWeatherPartlySunny} from 'react-icons/ti'
 
 const apps = [
    {
        id:1,
        library: <BiCalendar size={50}/>,
        name: 'Calender',
        color: "#275070",
    },{
        id:2,
        library:<BsImages size={45}/>,
        name: 'Gallery',
        color: "#00A8A8",
    },{
        id:3,
        library: <BiAlarm size={50}/>,
        name: 'Clock',
        color: "#FFBF86",
    },{
        id:4,
        library: <BiEqualizer size={50}/>,
        name: 'Music',
        color: "#A10035",
    },{
        id:5,
        library: <RiTaxiFill size={50}/>,
        name: 'Taxi',
        color: "#F77E21",
    },{
        id:6,
        library: <MdOutlineStickyNote2 size={50}/>,
        name: 'Note',
        color: "#5B4B8A",
    },{
        id:7,
        library: <TiWeatherPartlySunny size={40}/>,
        name: 'Weather',
        color: "#30475E",
    },{
        id:8,
        library: <RiMovie2Line size={50}/>,
        name: 'Movie',
        color: "#2155CD",
    },{
        id:9,
        library: <MdFastfood size={50}/>,
        name: 'Food',
        color: "#7A0BC0",
    },{
        id:10,
        library: <FaYoutube size={40}/>,
        name: 'YouTube',
        color: "#CF0A0A",
    },
]

export default apps;
