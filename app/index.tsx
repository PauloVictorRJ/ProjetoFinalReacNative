import { Text, View, StyleSheet, Pressable } from "react-native"
import * as Location from 'expo-location'
import MapView, { Marker, MapPressEvent, LatLng } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"
import AppBarComponent from "@/components/appBarComponent"
import { calculateRegion } from "@/utils/calculateRegion"
import { getLocation } from "@/utils/requestLocationPermission"
import { router } from "expo-router"

export default function Maps() {
    const [message, setMessage] = useState<string | null>(null)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [markers, setMarkers] = useState<Array<any>>([])

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const location = await getLocation()
                setLocation(location)
            } catch (error: any) {
                setMessage(error.message)
            }
        };
        fetchLocation()
    }, [])

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers')
            let markersList: Array<any> = []
            if (markersStorage) {
                markersList = JSON.parse(markersStorage)
                setMarkers(markersList)
            }
        })()
    }, [])

    if (message) {
        return <Text>{message}</Text>
    }

    if (!location) {
        return <Text>Carregando localização...</Text>
    }

    const region = calculateRegion(location)

    const handleMapPress = async (mapPress: MapPressEvent) => {
        const { coordinate } = mapPress.nativeEvent
        const markersStorage = await AsyncStorage.getItem('markers')
        let markersList: Array<any> = []
        if (markersStorage) {
            markersList = JSON.parse(markersStorage)
        }
        const markerName = `Marcador ${markersList.length + 1}`
        const newMarker = {
            nome: markerName,
            latLng: coordinate,
            cor: 'red',
        }
        markersList.push(newMarker)
        await AsyncStorage.setItem('markers', JSON.stringify(markersList))
        setMarkers(markersList)
    }

    const markerPress = (index: number) => {
        router.push(`/editMarker?index=${index}`)
    }

    const fabPress = () => {
        router.push('/newMarker')
    }

    return (
        <View>
            <AppBarComponent
                title="Projeto Final - React Native"
                showBack={false}
                showList={true} />
            <View style={styles.container}>
                <MapView
                    showsUserLocation
                    style={styles.locationMapView}
                    region={region}
                    onPress={handleMapPress}>
                    {markers.map((marker, index) => {
                        if (!marker.latLng) {
                            return null;
                        }
                        return (
                            <Marker
                                draggable
                                onPress={() => markerPress(index)}
                                coordinate={marker.latLng}
                                pinColor={marker.cor}
                                key={index}>
                            </Marker>
                        );
                    })}
                </MapView>
            </View>
            <Pressable style={styles.fab} onPress={fabPress}>
                <Text style={styles.fabText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationMapView: {
        height: "95%",
        width: "95%",
    },
    fab: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 5,
        bottom: 10,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 50,
    },
    fabText: {
        fontSize: 20,
        alignSelf: 'center',
    }
})