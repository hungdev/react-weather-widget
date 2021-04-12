import React from 'react'
import './Weekday.scss'
import moment from 'moment'

export interface IElement {
  dt: number;
  weather: any;
  temp: any;
  humidity?: string;
  wind_deg?: string;
  wind_speed?: string;
}

interface IWeekday {
  daily: any;
  onSelectDay: any
  currenSelect: number
}
export default function Weekday({ daily, onSelectDay, currenSelect }: IWeekday) {
  const onClickDay = (daily: IElement, isCurrent: boolean) => () => onSelectDay && onSelectDay(daily, isCurrent)
  return (
    <div className='week-day'>
      {daily && daily?.map((day: IElement, i: number) => (
        <div className={`day-card ${moment.unix(currenSelect).isSame(moment.unix(day?.dt), 'day') && 'active-day'}`} key={i} onClick={onClickDay(day, i === 0)}>
          <div className='day'>{moment.unix(day?.dt).format('dddd')}</div>
          <img src={`http://openweathermap.org/img/wn/${day?.weather?.[0]?.icon}@2x.png`} className='icon-weather' />
          <div className='temp-max'>{Math.round(day?.temp?.max)}°</div>
          <div className='temp-min'>{Math.round(day?.temp?.min)}°</div>
        </div>
      ))}
    </div>
  )
}
