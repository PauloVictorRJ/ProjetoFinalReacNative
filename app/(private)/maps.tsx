import { Text, View, StyleSheet, Pressable, useWindowDimensions, FlatList, StatusBar } from "react-native"
import * as Location from 'expo-location'
import MapView, { Marker, MapPressEvent } from 'react-native-maps'
import { useContext, useEffect, useState } from "react"
import AppBarComponent from "../../components/appBarComponent"
import { calculateRegion } from "../../utils/calculateRegion"
import { getLocation } from "../../utils/requestLocationPermission"
import { router } from "expo-router"
import MarkerComponent from "../../components/markerComponent"
import { colorConstants } from "../../styles/Global.styles"
import { UserContext } from "../../store/UserStore"
import env from '../../constants/env';
import { ActivityIndicator } from "react-native-paper"
import { saveMarkerFirebase } from "../../network/firebaseSaveMarker";
import { loadMarkersListFromFirebase } from '../../network/firebaseLoadListMarkers';

export default function Maps() {
    const userAuth = useContext(UserContext)

    const { width, height } = useWindowDimensions()
    const isTabletLandscape = width > height && width >= 768

    const [message, setMessage] = useState<string | null>(null)
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [markers, setMarkers] = useState<Array<any>>([])
    const [isLoading, setLoading] = useState(false)
    const [requestMessage, setRequestMessage] = useState<String | null>(null)

    useEffect(() => {
        fetchLocation()
        fetchData();
    }, []);

    const fetchLocation = async () => {
        try {
            const location = await getLocation()
            setLocation(location)
        } catch (error: any) {
            setMessage(error.message)
        }
    };

    const fetchData = async () => {
        //await getMarkersFromAsyncStorage()
        await getMarkersFromFirebase()
        //refreshMarkersOnFirebase()
    };

    const getMarkersFromFirebase = async () => {
        setLoading(true);
        try {
            const fetchedMarkers = await loadMarkersListFromFirebase();
            setMarkers(fetchedMarkers);
        } catch (error) {
            setRequestMessage("Erro ao carregar os marcadores");
        } finally {
            setLoading(false);
        }
    };

    const refreshMarkersOnFirebase = async () => {
        try {
            if (markers.length === 0) {
                return;
            }
            const requests = markers.map(async (marker: { id?: string, nome: string; cor: string; latLng: { latitude: number; longitude: number } }) => {
                const response = await fetch(`${env.DB_URL}/markers.json`, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify([
                        marker.id,
                        marker.nome,
                        marker.cor,
                        marker.latLng.latitude,
                        marker.latLng.longitude,
                    ]),
                });

                if (!response.ok) {
                    throw new Error(`Erro ao enviar o marcador: ${marker.nome}`);
                }
            });

            await Promise.all(requests);
            setRequestMessage('Marcadores atualizados com sucesso no Firebase!');
        } catch (error) {
            setRequestMessage(`Erro ao atualizar os marcadores: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    }

    if (message) {
        return <Text>{message}</Text>
    }

    if (!location) {
        return <Text>Carregando localização...</Text>
    }

    const region = calculateRegion(location)

    const handleMapPress = async (mapPress: MapPressEvent) => {
        const { coordinate } = mapPress.nativeEvent

        const newMarker = {
            nome: `Marcador ${markers.length + 1}`,
            cor: 'red',
            latLng: coordinate,
            id: `marker-${Date.now()}`,
        }

        const isSaved = await saveMarkerFirebase(newMarker)
        if (isSaved) {
            setMarkers(prevMarkers => [...prevMarkers, newMarker])
        }
    }

    const markerPress = (id: string) => {
        router.push(`/editMarker?index=${id}`);
    }


    const fabPress = () => {
        router.push('/newMarker')
    }

    return (
        <View style={styles.fullContainer}>
            <StatusBar backgroundColor={styles.statusBar.backgroundColor} barStyle="light-content" />
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
                        renderItem={({ item, index }) => {
                            return (
                                <MarkerComponent
                                    onPress={() => {
                                        markerPress(item.id)
                                        console.log('saiu do MarkerComponent')
                                    }}
                                    nome={item.nome}
                                    latLng={item.latLng}
                                    cor={item.cor}
                                    id={item.id}
                                />
                            );
                        }}
                        contentContainerStyle={styles.contentContainer}
                    />

                )}
                <Text style={styles.UserMsg}>Olá {userAuth?.email} !</Text>
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
                                onPress={() => {
                                    markerPress(marker.id)
                                    console.log('saiu do Marker com o id:' + marker.id)
                                }}
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
        backgroundColor: colorConstants.fab,
        padding: 10,
        borderRadius: 50,
    },
    fabText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    statusBar: {
        backgroundColor: colorConstants.appBarColor,
    },
    UserMsg: {
        color: colorConstants.userMsg,
    },
})