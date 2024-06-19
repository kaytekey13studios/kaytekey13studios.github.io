import React from 'react'
import ReactDOM from 'react-dom/client'
// import Calendar from 'reactjs-availability-calendar'
import Calendar from './../components/Calendar'

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <h1>Hioi</h1>
    <div className='demo'>
    <Calendar 
      bookings={bookings} 
      handleDayClick={(dayId)=>{console.log("Day id is: ", dayId)}}
    />
    </div>
  </React.StrictMode>
)
