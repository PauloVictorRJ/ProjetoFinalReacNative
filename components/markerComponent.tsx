import { colorConstants } from '@/styles/Global.styles'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper';

interface MarkerComponentProps {
    nome: string
    latLng: {
        latitude: number
        longitude: number
    };
    cor: string
    id: string
    onPress: (id: string) => void
}

export default function MarkerComponent({
    nome,
    latLng,
    cor,
    id,
    onPress,
}: MarkerComponentProps) {
    return (
        <TouchableRipple onPress={() => onPress(id)}>
            <Card style={[styles.container, { backgroundColor: cor }]}>
                <Card.Content>
                    <Text style={styles.title}>{nome}</Text>
                    <Text style={styles.text}>Latitude: {latLng.latitude}</Text>
                    <Text style={styles.text}>Longitude: {latLng.longitude}</Text>
                    <Text style={styles.id}>ID: {id}</Text>
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
        color: colorConstants.text,
        textShadowColor: 'black',  
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 3,  
    },
    text: {
        fontSize: 16,
        marginTop: 4,
        color: colorConstants.text,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },  
        textShadowRadius: 3,
    },
    id: {
        fontSize: 12,
        color: colorConstants.text,
        marginTop: 8,
        textShadowColor: 'black', 
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
})
