import AppBarComponent from '../../components/appBarComponent'
import MarkerComponent from '../../components/markerComponent'
import { colorConstants } from '../../styles/Global.styles'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, StatusBar } from 'react-native'
import { loadMarkersListFromFirebase } from '../../network/firebaseLoadListMarkers';

export default function ListMarkers() {
    useEffect(() => {
        getMarkersFromFirebase();
    }, []);

    const [markersList, setMarkersList] = useState<Array<any>>([])

    const getMarkersFromFirebase = async () => {
        try {
            const fetchedMarkers = await loadMarkersListFromFirebase();
            setMarkersList(fetchedMarkers);
        } catch (error) {
        }
    };

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
                renderItem={({ item }) => (
                    <MarkerComponent
                        onPress={() => markerPress(item.id)}
                        nome={item.nome}
                        latLng={item.latLng}
                        cor={item.cor}
                        id={item.id}
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