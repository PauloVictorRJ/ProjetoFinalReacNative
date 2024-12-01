import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import AppBarComponent from "@/components/appBarComponent"
import { Picker } from "@react-native-picker/picker"

export default function EditMarker() {
    const [marker, setMarker] = useState<any>(null)
    const { index } = useLocalSearchParams()
    const [inputColors, setInputColors] = useState("")
    const [inputNome, setInputNome] = useState("")
    const [inputLatitude, setInputLatitude] = useState(marker?.latLng.latitude ? String(marker.latLng.latitude) : "")
    const [inputLongitude, setInputLongitude] = useState(marker?.latLng.longitude ? String(marker.latLng.longitude) : "")
    const colorList = [
        { label: "Vermelho", value: "red" },
        { label: "Azul", value: "blue" },
        { label: "Verde", value: "green" },
        { label: "Amarelo", value: "yellow" }
    ]

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem("markers")
            if (markersStorage) {
                const parsedMarkers = JSON.parse(markersStorage);
                if (index && parsedMarkers[Number(index)]) {
                    const loadedMarker = parsedMarkers[Number(index)]
                    setMarker(parsedMarkers[Number(index)])
                    setInputColors(loadedMarker.cor || "")
                }
            }
        })()
    }, [])

    if (!marker) {
        return <Text>Loading...</Text>
    }

    const saveMarker = async () => {
        const latitude = parseFloat(inputLatitude)
        const longitude = parseFloat(inputLongitude)

        if (inputLatitude && isNaN(latitude)) {
            Alert.alert("Erro", "Latitude deve ser um número válido.")
            return
        }
        if (inputLongitude && isNaN(longitude)) {
            Alert.alert("Erro", "Longitude deve ser um número válido.")
            return
        }

        const markersStorage = await AsyncStorage.getItem("markers")
        if (markersStorage) {
            const parsedMarkers = JSON.parse(markersStorage)

            if (index && parsedMarkers[Number(index)]) {
                const updatedMarker = { ...parsedMarkers[Number(index)] }

                if (inputNome) updatedMarker.nome = inputNome
                if (inputLatitude) updatedMarker.latLng.latitude = latitude
                if (inputLongitude) updatedMarker.latLng.longitude = longitude
                if (inputColors) updatedMarker.cor = inputColors

                parsedMarkers[Number(index)] = updatedMarker

                await AsyncStorage.setItem("markers", JSON.stringify(parsedMarkers))
                Alert.alert("Sucesso", "O marcador foi atualizado com sucesso.")
                router.back()
            } else {
                Alert.alert("Erro", "Não foi possível encontrar o marcador para atualizar.")
            }
        } else {
            Alert.alert("Erro", "Nenhum marcador encontrado no armazenamento.")
        }
    };


    const removeMarker = async () => {
        const markersStorage = await AsyncStorage.getItem("markers")
        if (markersStorage) {
            const parsedMarkers = JSON.parse(markersStorage)
            if (index && parsedMarkers[Number(index)]) {
                parsedMarkers.splice(Number(index), 1)
                await AsyncStorage.setItem("markers", JSON.stringify(parsedMarkers))
                Alert.alert("O marcador foi removido com sucesso.")
                setMarker(null)
                router.back()
            }
        }
    };

    return (
        <View>
            <AppBarComponent
                title="Editar localização"
                showBack={true}
                showList={false} />
            <View style={styles.formContainer}>
                <Text> Nome:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder={marker.nome}
                    value={inputNome}
                    onChangeText={setInputNome}
                />
                <Text> Latitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder={String(marker.latLng.latitude)}
                    value={inputLatitude}
                    onChangeText={setInputLatitude}
                />
                <Text> Longitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder={String(marker.latLng.longitude)}
                    value={inputLongitude}
                    onChangeText={setInputLongitude}
                />
                <Text> Cor:</Text>
                <View style={styles.formPickerContainer}>
                    <Picker
                        style={styles.formPicker}
                        selectedValue={inputColors}
                        onValueChange={setInputColors}>
                        {colorList.map((color, index) => <Picker.Item {...color} key={index} />)}
                    </Picker>
                </View>
                <Pressable style={styles.formPressableSubmit} onPress={saveMarker}>
                    <Text style={styles.formPressableSubmitLabel}>Salvar</Text>
                </Pressable>
                <Pressable style={styles.formPressableRemove} onPress={removeMarker}>
                    <Text style={styles.formPressableSubmitLabel}>Remover</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    formTextInput: {
        margin: 4,
        padding: 8,
        borderRadius: 5,
        backgroundColor: "#d6d0d0"
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
    formPicker: {
        flex: 1,
    },
    formPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formPressableSubmit: {
        backgroundColor: "#8cd867",
        margin: 20,
        padding: 5,
        borderRadius: 5,
    },
    formPressableSubmitLabel: {
        textAlign: "center",
    },
    formPressableRemove: {
        backgroundColor: "#f03c42",
        margin: 20,
        padding: 5,
        borderRadius: 5,
    }
})