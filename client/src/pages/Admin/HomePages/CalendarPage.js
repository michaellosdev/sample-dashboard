import React, {useState, Fragment, useMemo, useEffect} from 'react'
import { Card, Typography } from '@mui/material'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import * as dates from '../../../utils/dates'
import axios from 'axios'
import { BlueColor_100, GreenColor_100 } from '../../../styles/_variables'


const localizer = momentLocalizer(moment)

// const event =  [{
//   // id: 0,
//   // title: 'All Day Event very long title',
//   // allDay: true,
//   // start: Date.now(),
//   // end: new Date(2022, 12, 5),
//   // color: GreenColor_100
// }]

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor:GreenColor_100,
    },
  })


function CalendarPage() {

  const [jobs, setJobs] = useState([])
  const [event, setEvent] = useState([])

  const fetchJobs = async() => {
      const {data} = await axios.get(`http://localhost:6001/jobs`, {withCredentials: true})
      setJobs(data)
      setEvent(data)
  }

  useEffect(()=> {
    fetchJobs()
  }, [])



  const newarr = jobs.map(item => {

    let startYear = new Date(item.startJobDate).getFullYear()
    let startMonth = new Date(item.startJobDate).getMonth()
    let startDay = new Date(item.startJobDate).getDate()
    let startHour = new Date(item.startJobDate).getHours()
    let startMin = new Date(item.startJobDate).getMinutes()

    console.log(startDay)

    let endYear = new Date(item.endJobDate).getFullYear()
    let endMonth = new Date(item.endJobDate).getMonth()
    let endDay = new Date(item.endJobDate).getDate()
    let endHour = new Date(item.endJobDate).getHours()
    let endMin = new Date(item.endJobDate).getMinutes()

    console.log(startYear, startMonth, startDay, startHour, startMin);
    console.log(endYear, endMonth, endDay);

    const arr = {
      title: `Customer: ${item?.customer?.firstName} ${item?.customer?.lastName}.
       Tech: ${item?.employee?.firstName} ${item?.employee?.lastName} Start Time: ${startHour + ':'+ startMin}`,
      allDay: false,
      start: new Date(startYear, startMonth, startDay, startHour, startMin),
      end: new Date(endYear, endMonth, endDay, endHour, endMin),
      color: GreenColor_100
    }


    console.log(typeof(arr.start))
    // console.log(new Date(item.startJobTime).getMinutes())

    return arr

  })

  
console.log(newarr)


  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: Date.now(),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )

  const [value, onChange] = useState(new Date());
  return (
    <div style={{height: '80vh', width: '100%'}} onClick={() => console.log(event)}>
    <Card elevation={10} sx={{height:'100%', width: '100%', padding:'30px', borderRadius:'20px'}}>
      <Calendar 
        defaultDate={defaultDate}
        components={components}
        startAccessor="start"
        endAccessor="end"
        max={max}
        views={views}
        localizer={localizer}
        events={newarr}
      
        
        />
    </Card>
    </div>
  )
}

export default CalendarPage