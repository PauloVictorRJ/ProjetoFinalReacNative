import AppBarComponent from '../../components/appBarComponent'
import MarkerComponent from '../../components/markerComponent'
import { colorConstants } from '../../styles/Global.styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, StatusBar } from 'react-native'

export default function ListMarkers() {

    const [markersList, setMarkersList] = useState<Array<any>>([])

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers')
            if (markersStorage) {
                const parsedMarkers = JSON.parse(markersStorage)
                setMarkersList(parsedMarkers)
            }
        })()
    }, [])

    const markerPress = (index: number) => {
        router.push(`/editMarker?index=${index}`)
    }

    return (
        <View style={styles.fullContainer}>
            <StatusBar backgroundColor={styles.statusBar.backgroundColor} barStyle="light-content" />
            <AppBarComponent
                title="Todas as localizações"
                showBack={true}
                showList={false} />
            <FlatList
                data={markersList}
                keyExtractor={(item) => item.id}
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
        </View>
    )
}

const styles = StyleSheet.create({
    fullContainer: {
        backgroundColor: colorConstants.backgroundColor,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    statusBar: {
        backgroundColor: colorConstants.appBarColor,
    },
})