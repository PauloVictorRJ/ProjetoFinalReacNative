import { LocationObject } from "expo-location";

export function calculateRegion(location: LocationObject): { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } {
    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
}
