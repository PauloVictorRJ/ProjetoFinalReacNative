import { Text, View, StyleSheet, Pressable, useWindowDimensions, FlatList } from "react-native"
import * as Location from 'expo-location'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from "react"
import AppBarComponent from "@/components/appBarComponent"
import { calculateRegion } from "@/utils/calculateRegion"
import { getLocation } from "@/utils/requestLocationPermission"
import { router } from "expo-router"
import MarkerComponent from "@/components/markerComponent"
import { colorConstants } from "@/styles/Global.styles"
import { UserContext } from "@/store/UserStore"
import env from '@/constants/env';
import { ActivityIndicator } from "react-native-paper"

// fetch delete
// refreshingAction
//

export default function Maps() {
    const userAuth = useContext(UserContext)

    const { width, height } = useWindowDimensions()
    const isTabletLandscape = width > height && width >= 768

    const [message, setMessage] = useState<string | null>(null)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [markers, setMarkers] = useState<Array<any>>([])
    const [isLoading, setLoading] = useState(false)
    const [requestMessage, setRequestMessage] = useState<String | null>(null)

    const getMarkersApi = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${env.DB_URL}/markers.json`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            console.log("Dados recebidos:", data);

            const markers = Object.keys(data).map(key => ({
                id: key,
                nome: data[key][0],
                cor: data[key][1],
                latLng: {
                    latitude: data[key][2],
                    longitude: data[key][3],
                },
            }));

            setMarkers(markers);
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.error("Erro ao obter marcadores:", errorMessage);
            setRequestMessage(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getMarkersApi()
    }, [])

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

    // useEffect(() => {
    //     (async () => {
    //         const markersStorage = await AsyncStorage.getItem('markers')
    //         let markersList: Array<any> = []
    //         if (markersStorage) {
    //             markersList = JSON.parse(markersStorage)
    //             setMarkers(markersList)
    //         }
    //     })()
    // }, [])

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
        <View style={styles.fullContainer}>
            <AppBarComponent
                title="Projeto Final - React Native"
                showBack={true}
                showList={true}
            />
            <View style={[styles.container, isTabletLandscape && styles.tabletContainer]}>
                {isLoading && <ActivityIndicator size={'large'} />}
                {requestMessage && <Text>message</Text>}
                {isTabletLandscape && (
                    <FlatList
                        data={markers}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <MarkerComponent
                                onPress={() => markerPress(index)}
                                nome={item.nome}
                                latLng={item.latLng}
                                cor={item.cor}
                            />
                        )}
                        contentContainerStyle={styles.contentContainer}
                    />
                )}
                <Text>Olá {userAuth?.email} !</Text>
                <MapView
                    showsUserLocation
                    style={[styles.locationMapView, isTabletLandscape && styles.tabletMapView]}
                    region={region}
                    onPress={handleMapPress}
                >
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
                                key={index}
                            />
                        )
                    })}
                </MapView>
            </View>
            <Pressable style={styles.fab} onPress={fabPress}>
                <Text style={styles.fabText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 40,
    },
    fullContainer: {
        backgroundColor: colorConstants.backgroundColor,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabletContainer: {
        flexDirection: 'row',
    },
    locationMapView: {
        height: "95%",
        width: "95%",
    },
    tabletMapView: {
        height: "100%",
        width: "50%",
    },
    infoPanel: {
        width: "50%",
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
})