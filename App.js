import React from 'react'
import { Alert } from 'react-native'
import Loading from './Loading'
import * as Location from 'expo-location'

export default class extends React.Component {
  state = {
    isLoading: true,
  }
  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync() // 강의에서는 requestPermissionsAsync를 사용했으나 deprecated됨

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync()
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
