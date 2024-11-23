import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MarkerComponentProps {
    nome: string;
    latLng: {
        latitude: number;
        longitude: number;
    };
    cor: string;
}

export default function MarkerComponent({
    nome,
    latLng,
    cor,
}: MarkerComponentProps) {
    return (
        <View style={[styles.container, { backgroundColor: cor }]}>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.text}>Latitude: {latLng.latitude}</Text>
            <Text style={styles.text}>Longitude: {latLng.longitude}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        margin: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginTop: 4,
    },
});
