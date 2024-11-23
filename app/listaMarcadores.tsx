import MarkerComponent from '@/components/markerComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native'
import { LatLng } from 'react-native-maps';

export default function ListaMarcadores() {

    const [markersList, setMarkersList] = useState<Array<LatLng>>([]);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers');
            if (markersStorage) {
                const parsedMarkers = JSON.parse(markersStorage);
                setMarkersList(parsedMarkers);
            }
        })();
    }, []);


    return (
        <View>
            <Text>Lista de Marcadores</Text>
            <FlatList
                data={markersList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <MarkerComponent
                        nome={`Marcador ${item.latitude.toFixed(2)}, ${item.longitude.toFixed(2)}`}
                        latLng={item}
                        cor="lightblue"
                    />
                )}
            />
        </View>
    );
}
