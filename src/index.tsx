import React from 'react'
import ReactDOM from 'react-dom/client'
// import Calendar from 'reactjs-availability-calendar'
import Calendar from './../components/Calendar'
import * as moment from 'moment'
import 'twix'

const dateFormat = "M-D-YYYY"

const bookings = [
  {
    from: '2024-06-08T00:00:00.000Z',
    to: '2024-06-10T00:00:00.000Z',
    middayCheckout: true,
  },
  {
    from: '2022-09-03T19:20:35.593Z',
    to: '2022-09-03T19:20:35.593Z',
    middayCheckout: false,
  },
]

// MOVE TO YEAR COMPONENT => Day component
// 
// Check whether dayId falls within Calendar's selected range
// so that css class attached to day component can be set to 'isSelected'
//
const inDateRange = (dayId, range)=> {

  let inRange = false
  let workableRange

  if( range['start'] )
  {
  
    if( range['end'] ) 
    {
      workableRange = moment(range['start'], dateFormat).twix(dayId, true)
      inRange = workableRange.isSame("day")
    }
    else{
      workableRange = moment(range['start'], dateFormat).twix(range['end'], true)
      inRange = workableRange.contains(dayId)
    }

    console.log("From inDateRange: ", workableRange.simpleFormat())
      
      
  }  
  return inRange

}

// Return a new range based on intention determined from which day has been chosen
// given a certain selection context
//
const modifyRangeSelection = (dayId, currentSelection, setSelectedDateRange) =>{

  if(!dayId)
    return

  const startDate  = currentSelection['start']  // && currentSelection['start'] != null 
  const endDate    = currentSelection['end']    // && currentSelection['end']   != null   

  // workableRange = moment(range['start'], dateFormat).twix(range['start'], true)

  // If start and end have both already been selected, new selection is meant to clear
  // out range and start over
  if(startDate && endDate){
    console.log("startAlreadySelected && endAlreadySelected")
    setSelectedDateRange({start:dayId, end:""})
  }
  // Otherwise if only start has been selected, new selection is meant to select end date
  //
  else if(startDate && !endDate){
    console.log("startAlreadySelected && !endAlreadySelected")
    
    // If end date is indicated as a date before the start date, swap the two
    const workableRange         = moment(startDate, dateFormat).twix(dayId, true)

    if(workableRange.isValid()){
      setSelectedDateRange({start:startDate, end: dayId})
    }
    else
    {
      setSelectedDateRange({start:dayId, end: startDate})
    }
    
  }

  // If range is empty, next click is meant to be start date
  else if(!startDate && !endDate){
    console.log("!startAlreadySelected && !endAlreadySelected")
    setSelectedDateRange({start:dayId, end: ""})
  }

}


const RangeSelectableCalendar = (props) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState({start:"", end: ""})

  React.useEffect(()=>{
    console.log("selectedDateRange updated: ", selectedDateRange)
  },[selectedDateRange])

  return (
    <React.StrictMode>
    <div className='demo'>
    <Calendar 
      bookings={bookings} 
      handleDayClick={(dayId)=>{

        // console.log("From Day Click Handler: dayId is: ", dayId)
        // Add day that was clicked into the selected date range
        //
        modifyRangeSelection(dayId, selectedDateRange, setSelectedDateRange)


      }}
      selectedDateRange={selectedDateRange}
    />
    </div>
  </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <RangeSelectableCalendar></RangeSelectableCalendar>
)
