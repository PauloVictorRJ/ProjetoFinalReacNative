import { TextInput, Text, View, StyleSheet } from "react-native";

export default function InputCustomUserName({ 
    placeholder, 
    value, 
    setValue, 
    minLength, 
    showError, 
    editable = true 
}: any) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={[styles.input, !editable && styles.inputDisabled]}
                editable={editable}
                placeholderTextColor="#888"
            />
            <View style={styles.errorContainer}>
                {showError && (
                    <Text style={styles.errorText}>
                        O nome de usuário deve ter no mínimo {minLength} caracteres
                    </Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputDisabled: {
        backgroundColor: '#e0e0e0',
        color: '#999',
    },
    errorContainer: {
        height: 20,
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
})