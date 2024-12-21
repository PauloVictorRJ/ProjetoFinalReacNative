import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'

interface MarkerComponentProps {
    nome: string
    latLng: {
        latitude: number
        longitude: number
    }
    cor: string
    id?: string
    onPress: (id: string) => void
}

export default function MarkerComponent({
    nome,
    latLng,
    cor,
    id,
    onPress,
}: MarkerComponentProps) {
    const idRef = useRef(id || `marker-${Date.now()}`)

    return (
        <TouchableRipple onPress={() => onPress(idRef.current)}>
            <Card style={[styles.container, { backgroundColor: cor }]}>
                <Card.Content>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.text}>Latitude: {latLng.latitude}</Text>
                    <Text style={styles.text}>Longitude: {latLng.longitude}</Text>
                    <Text style={styles.id}>ID: {idRef.current}</Text>
                </Card.Content>
            </Card>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
        borderRadius: 8,
        padding: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginTop: 4,
    },
    id: {
        fontSize: 12,
        color: 'gray',
        marginTop: 8,
    },
})