import React, { useState, useEffect } from 'react'
import './WeatherWidget.scss'
import moment from 'moment'
import { IGeocoding } from '../../models/geocoding'
import { IWidgetData } from '../../models/forecast'
import { IAirPollution } from '../../models/airPollution'
import { fcConverter, getWindDirection, airQualities } from '../../utils'

interface IWeatherWidget {
  coordinates: IGeocoding;
  widgetData: IWidgetData;
  airQuality: IAirPollution;
}

export default function WeatherWidget(props: IWeatherWidget) {
  const { coordinates, widgetData, airQuality } = props;
  // const [temperature, setTemperature] = useState({ type: 'c', temp: widgetData?.temperature && Math.round(widgetData?.temperature * 10) / 10 })
  const [temperature, setTemperature] = useState({ type: 'c', temp: widgetData?.temperature && Math.round(widgetData?.temperature) })
  const isC = temperature.type === 'c'
  const airQualityIndex = airQuality?.list?.[0]?.main?.aqi

  useEffect(() => {
    widgetData?.temperature && setTemperature(prev => ({
      ...prev,
      temp: prev.type === 'c'
        // ? Math.round(widgetData?.temperature * 10) / 10
        // : fcConverter(Math.round(widgetData?.temperature * 10) / 10, 'f')
        ? Math.round(widgetData?.temperature)
        : fcConverter(Math.round(widgetData?.temperature), 'f')
    }))
  }, [widgetData])

  const onChangeDegree = (type: string) => () => {
    setTemperature(prev => ({ type, temp: fcConverter(prev.temp, type) }))
  }

  return (
    <div className='weather-widget'>
      <div className='place'>{coordinates?.local_names?.ascii}, {coordinates?.country} </div>
      <div className='time'>{moment.unix(widgetData?.dt).format('dddd h A')} • {widgetData?.description}</div>
      <div className='information'>
        <div className='temperature-wrapper'>
          <img src={`http://openweathermap.org/img/wn/${widgetData?.icon}@2x.png`} width="55" height="55" />
          <div className='temperature'>{Math.round(temperature?.temp)}°</div>
          {/* <div className='temperature'>{Math.round((temperature?.temp + Number.EPSILON) * 100) / 100}°</div> */}
          <div className='degree-wrapper'>
            <span className={`degree ${!isC && 'degree-active'}`} onClick={onChangeDegree('f')}>F</span>
            <span> / </span>
            <span className={`degree ${isC && 'degree-active'}`} onClick={onChangeDegree('c')}>C</span>
          </div>
        </div>
        <div className='humidity-wrapper'>
          <div>Humidity: {widgetData?.humidity}%</div>
          <div>Wind: {widgetData?.windSpeed} {isC ? 'KPH' : 'MPH'} {getWindDirection(widgetData?.wind)}</div>
          {moment.unix(widgetData?.dt).isSame(moment(), 'day') && <div> Air Quality: {airQualityIndex && airQualities[airQualityIndex]}</div>}
        </div>
      </div>
    </div >
  )
}
