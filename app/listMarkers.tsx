import AppBarComponent from '@/components/appBarComponent';
import MarkerComponent from '@/components/markerComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native'

export default function ListMarkers() {

    const [markersList, setMarkersList] = useState<Array<any>>([]);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers');
            if (markersStorage) {
                const parsedMarkers = JSON.parse(markersStorage);
                setMarkersList(parsedMarkers);
            }
        })();
    }, []);

    const markerPress = (index: number) => {
        router.push(`/editMarker?index=${index}`)
    };

    return (
        <View>
            <AppBarComponent
                title="Todas as localizações"
                showBack={true}
                showList={false} />
            <FlatList
                data={markersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <MarkerComponent
                        onPress={() => markerPress(index)}
                        nome={item.nome}
                        latLng={item.latLng}
                        cor={item.cor} />
                )} />
        </View>
    );
}
