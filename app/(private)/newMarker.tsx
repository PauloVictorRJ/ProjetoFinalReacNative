import AppBarComponent from "../../components/appBarComponent"
import { Picker } from "@react-native-picker/picker"
import { router } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import { useState } from "react"
import { Pressable, Text, TextInput, View, StyleSheet, Alert, StatusBar } from "react-native"
import env from '../../constants/env';
import { colorConstants, fontConstants } from "../../styles/Global.styles"

export default function NewMarker() {
    const db = useSQLiteContext()
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
    }

    const saveMarkerOnFirebase = async (marker: { nome: string; cor: string; latLng: { latitude: number; longitude: number } }) => {
        try {
            await fetch(`${env.DB_URL}/markers.json`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(
                    [marker.nome, marker.cor, marker.latLng.latitude, marker.latLng.longitude]
                )
            })

        } catch (error) {
            console.error("Erro ao salvar no Firebase:", error)
            Alert.alert("Erro", "Não foi possível salvar o marcador no banco de dados.")
        }
    }

    return (
        <View style={styles.fullContainer}>
            <StatusBar backgroundColor={styles.statusBar.backgroundColor} barStyle="light-content" />
            <AppBarComponent
                title="Nova localização"
                showBack={true}
                showList={false} />
            <View style={styles.formContainer}>
                <Text style={styles.text}> Nome:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='nome'
                    value={inputNome}
                    onChangeText={setInputNome}
                    placeholderTextColor={colorConstants.formTextColor}
                />
                <Text style={styles.text}> Latitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='latitude'
                    value={inputLatitude}
                    onChangeText={setInputLatitude}
                    placeholderTextColor={colorConstants.formTextColor}
                />
                <Text style={styles.text}> Longitude:</Text>
                <TextInput
                    style={styles.formTextInput}
                    placeholder='Longitude'
                    value={inputLongitude}
                    onChangeText={setInputLongitude}
                    placeholderTextColor={colorConstants.formTextColor}
                />
                <Text style={styles.text}> Cor:</Text>
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
    fullContainer: {
        backgroundColor: colorConstants.backgroundColor,
        flex: 1,
    },
    formContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    formTextInput: {
        backgroundColor: colorConstants.formBackgroundColor,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        color: colorConstants.formTextColor
    },
    text: {
        fontSize: 14,
        color: colorConstants.text
    },
    formPicker: {
        flex: 1,
        color: colorConstants.picker
    },
    formPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formPressableSubmit: {
        backgroundColor: colorConstants.pressableBackgroundColor,
        margin: 20,
        padding: 5,
        borderRadius: 5,
    },
    formPressableSubmitLabel: {
        fontFamily: fontConstants.fontFamilyMystery,
        textAlign: "center",
    },
    formPressableRemove: {
        backgroundColor: "#f03c42",
        margin: 20,
        padding: 5,
        borderRadius: 5,
    },
    statusBar: {
        backgroundColor: colorConstants.appBarColor,
    },
})