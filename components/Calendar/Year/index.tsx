import React, { useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IYear } from './../types'
import { daysOfTheWeek, daysOfTheWeekOffset, getMonthName } from './../Utils'

dayjs.extend(isBetween)

const Year = ({
  activeYear,
  showNumberOfMonths = 12,
  bookedDates = [],
  lateCheckouts = [],
  monthsFrom = 1,
  handleDayClick = (el1)=>{},
}: IYear): JSX.Element => {
  const _year = activeYear || dayjs().year()

  return (
    <div className='year' data-testid='year'>
      {new Array(showNumberOfMonths).fill('').map((_, pos) => {
        const arrOffset = 1
        const month = monthsFrom + pos
        const date = `${_year}-${month}`
        const monthName = getMonthName(month)
        const totalDays = dayjs(date).daysInMonth()
        const firstDayOfWeek = dayjs(`${date}-01`).day()

        const offsetDays =
          firstDayOfWeek !== 0
            ? new Array(firstDayOfWeek - arrOffset).fill('')
            : new Array(Number(daysOfTheWeekOffset[firstDayOfWeek])).fill('')

        const daysArr = new Array(totalDays).fill('')

        return (
          <div key={pos} className='month' data-testid='month'>
            <h3 className='monthName'>{monthName}</h3>

            <div className='content dayOfTheWeek'>
              {daysOfTheWeek.map((dayOfTheWeek, pos) => {
                return (
                  <div key={pos} className='day'>
                    {dayOfTheWeek}
                  </div>
                )
              })}
            </div>

            <div className='content'>
              {offsetDays.map((_, pos) => {
                return <div key={pos} className='day' />
              })}

              {daysArr.map((_, pos) => {

                // const [isSelected, setIsSelected] = useState(false);

                const day = pos + arrOffset
                const _date = `${month}-${day}-${_year}`

                const isBooked = Array.isArray(bookedDates) ? bookedDates.includes(_date) : false

                const isLateCheckout = Array.isArray(lateCheckouts) ? lateCheckouts.includes(_date) : false

                // Read Calender allDayStates prop to determine in what state this Day should render
                
                return (
                  <div
                    onClick={(evt)=>{
                      // Update the Calendar active state from here, depending on what the current state is
                      //
                      // const dayId = "1-1-11"//convertEventTargetToDayId(evt)
                      
                      // setIsSelected(!isSelected);
                      // console.log("newSelectedValue: ", isSelected);

                      
                      // if (handleDayClick != null)
                      //   handleDayClick(dayId)


                      console.log("Clicked the day! Data is: ", evt.target)


                    }}
                    key={pos}
                    className={`day ${isBooked ? 'booked' : ''} ${isLateCheckout ? 'isLateCheckout' : ''}`}
                  >
                    <span data-attribute={_date}>{day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Year
