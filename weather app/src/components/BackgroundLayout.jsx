import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context'
//images
import Clear from '../assets/images/Clear.jpg'
import Fog from '../assets/images/fog.png'
import Cloudy from '../assets/images/Cloudy.jpg'
import Rainy from '../assets/images/Rainy.jpg'
import Snow from '../assets/images/snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'
import Sunny from '../assets/images/Sunny.jpg'
import NightClear from '../assets/images/Daytime.jpg'
import NightCloudy from '../assets/images/Nighttime.jpg'

const BackgroundLayout = () => {
  const { weather } = useStateContext()
  const [image, setImage] = useState(Clear)

  const isDayTime = () => {
    const now = new Date()
    const sunrise = new Date(weather.sunrise)
    const sunset = new Date(weather.sunset)

    return now > sunrise && now < sunset
  }

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions
      if (isDayTime()) {
        if (imageString.toLowerCase().includes('clear')) {
          setImage(Clear)
        } else if (imageString.toLowerCase().includes('cloud')) {
          setImage(Cloudy)
        } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
          setImage(Rainy)
        } else if (imageString.toLowerCase().includes('snow')) {
          setImage(Snow)
        } else if (imageString.toLowerCase().includes('fog')) {
          setImage(Fog)
        } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
          setImage(Stormy)
        }
      } else {
        if (imageString.toLowerCase().includes('clear')) {
          setImage(NightClear)
        } else if (imageString.toLowerCase().includes('cloud')) {
          setImage(NightCloudy)
        } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
          setImage(Rainy)
        } else if (imageString.toLowerCase().includes('snow')) {
          setImage(Snow)
        } else if (imageString.toLowerCase().includes('fog')) {
          setImage(Fog)
        } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
          setImage(Stormy)
        }
      }
    }
  }, [weather])

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default BackgroundLayout
