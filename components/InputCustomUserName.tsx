import { colorConstants } from "@/styles/Global.styles";
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
                placeholderTextColor={colorConstants.formTextColor}
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
        backgroundColor: colorConstants.formBackgroundColor,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        color: colorConstants.formTextColor
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
        color: colorConstants.formTextWarningColor,
        fontSize: 12,
    },
})
