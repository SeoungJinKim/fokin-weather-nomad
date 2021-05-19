import React from 'react'
import { Alert } from 'react-native'
import Loading from './Loading'
import * as Location from 'expo-location'
import axios from 'axios'

const API_KEY = '1d76085eee44ef1d15c5f6703337227f'

export default class extends React.Component {
  state = {
    isLoading: true,
  }
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    )
    console.log(data)
  }
  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync() // 강의에서는 requestPermissionsAsync를 사용했으나 deprecated됨

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync()
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false })
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad')
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  render() {
    const { isLoading } = this.state
    return isLoading ? <Loading /> : null
  }
}
