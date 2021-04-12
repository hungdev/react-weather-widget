import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment'
import Input from './components/Input/Input'
import { getGeo, getForecast, getAirQuality } from './config/axiosConfig'
import WeatherWidget from './components/WeatherWidget/WeatherWidget'
import Weekday from './components/Weekday/Weekday'
import { IElement } from './components/Weekday/Weekday'
import cloudPhoto from './assets/cloud.png'
import Loading from './components/Loading/Loading'

function App() {
  const [location, setLocation] = useState('ha noi')
  const [geo, setGeo] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [airQuality, setAirQuality] = useState<any>(null)
  const [widgetData, setWidgetData] = useState<any>(null)
  const [current, setCurrent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  useEffect(() => {
    const getDefaultLocation = async () => {
      try {
        setIsLoading(true)
        const geoResult = await getGeo({ q: location, limit: 5, })
        setGeo(geoResult.data?.[0])
        setIsLoading(false)
      } catch (error) { console.log('getGeo', error) }
    }
    getDefaultLocation()
  }, [])

  useEffect(() => {
    const getForecastAndHistorical = async () => {
      try {
        setIsLoading(true)
        const [forecast, airQuality]: any = await Promise.allSettled([
          getForecast({ lat: geo?.lat, lon: geo?.lon, units: 'metric' }),
          getAirQuality({ lat: geo?.lat, lon: geo?.lon })
        ])
        const currentWeather = forecast?.value?.data?.current
        setIsLoading(false)
        setForecast(forecast?.value?.data)
        const transformData = {
          dt: currentWeather?.dt,
          description: currentWeather?.weather?.[0]?.description,
          icon: currentWeather?.weather?.[0]?.icon,
          temperature: currentWeather?.temp,
          humidity: currentWeather?.humidity,
          wind: currentWeather?.wind_deg,
          windSpeed: currentWeather?.wind_speed,
        }
        setWidgetData(transformData)
        setCurrent(transformData)
        setAirQuality(airQuality?.value?.data)
      } catch (error) { console.log('getForecastAndHistorical', error) }
      finally { setIsLoading(false) }
    }
    geo?.lat && geo?.lon && getForecastAndHistorical()
  }, [geo])

  const onSubmit = async () => {
    if (!location) return
    try {
      setIsSubmit(true)
      setIsLoading(true)
      const geoResult = await getGeo({ q: location, limit: 5, })
      setIsLoading(false)
      setGeo(geoResult.data?.[0])
      geoResult.data?.length === 0 && setLocation('not existed location')
    } catch (error) { setLocation('not existed location') }
    finally { setIsLoading(false) }
  }

  const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    setGeo(null)
    setIsSubmit(false)
  }
  const onClear = () => {
    setLocation('')
    setIsSubmit(false)
  }

  const onSelectDay = (data: IElement, isCurrent: boolean) => {
    setWidgetData(isCurrent ? current : {
      dt: data?.dt,
      description: data?.weather?.[0]?.description,
      icon: data?.weather?.[0]?.icon,
      temperature: data?.temp?.max,
      humidity: data?.humidity,
      wind: data?.wind_deg,
      windSpeed: data?.wind_speed,
    })
  }

  return (
    <div className="app">
      <div className='app-container'>
        <Input
          onSubmit={onSubmit}
          onChange={onChangeLocation}
          value={location}
          onClear={onClear}
        />
        <div className='app-content'>
          {isLoading ? <Loading /> : (
            <>
              {geo && location && widgetData &&
                (<>
                  <WeatherWidget
                    coordinates={geo}
                    widgetData={widgetData}
                    airQuality={airQuality}
                  />
                  <div className='weekdays'>
                    <Weekday
                      daily={forecast?.daily}
                      onSelectDay={onSelectDay}
                      currenSelect={widgetData?.dt}
                    />
                  </div>
                </>)
              }
              {isSubmit && !geo &&
                <div className='weather-widget not-found'>
                  <img src={cloudPhoto} alt='cloud' className='cloud' />
                  <div>We could not find weather information for the location above</div>
                </div>}

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
