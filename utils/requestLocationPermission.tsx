import * as Location from 'expo-location'

export const getLocation = async (): Promise<Location.LocationObject | null> => {
  let locationPermission = await Location.requestForegroundPermissionsAsync()
  let { status } = locationPermission

  if (status !== 'granted') {
    throw new Error('A permissão de localização foi negada!')
  }

  const location = await Location.getCurrentPositionAsync()
  return location
}
