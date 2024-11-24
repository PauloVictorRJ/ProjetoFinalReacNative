import AppBarComponent from "@/components/appBarComponent"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View, StyleSheet, Alert } from "react-native"

export default function NewMarker() {
    const [inputColors, setInputColors] = useState("")
    const [inputNome, setInputNome] = useState("")
    const [inputLatitude, setInputLatitude] = useState("")
    const [inputLongitude, setInputLongitude] = useState("")
    const colorList = [
        { label: "Vermelho", value: "red" },
        { label: "Azul", value: "blue" },
        { label: "Verde", value: "green" },
        { label: "Amarelo", value: "yellow" }
    ]

    const saveMarker = async () => {
        const latitude = parseFloat(inputLatitude)
        const longitude = parseFloat(inputLongitude)

        if (!inputLatitude || isNaN(latitude)) {
            Alert.alert("Erro", "Latitude deve ser um número válido.")
            return
        }
        if (!inputLongitude || isNaN(longitude)) {
            Alert.alert("Erro", "Longitude deve ser um número válido.")
            return
        }

        const newMarker = {
            nome: inputNome,
            cor: inputColors,
            latLng: {
                latitude: latitude,
                longitude: longitude
            }
        }

        try {
            const markersStorage = await AsyncStorage.getItem("markers")
            const parsedMarkers = markersStorage ? JSON.parse(markersStorage) : []
            parsedMarkers.push(newMarker)
            await AsyncStorage.setItem("markers", JSON.stringify(parsedMarkers))
            router.back()
            Alert.alert("Sucesso", "O marcador foi salvo com sucesso.")
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao salvar o marcador.")
        }
    }

    return (
        <View>
            <AppBarComponent
                title="Nova localização"
                showBack={true}
                showList={false} />
            <View style={styles.formContainer}>
                <Text> Nome:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='Nome'
                    value={inputNome}
                    onChangeText={setInputNome}
                />
                <Text> Latitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='Latitude'
                    value={inputLatitude}
                    onChangeText={setInputLatitude}
                />
                <Text> Longitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='Longitude'
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