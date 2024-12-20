import { colorConstants } from "@/styles/Global.styles";
import { useState } from "react";
import { TextInput, Text, View, TouchableOpacity, StyleSheet } from "react-native";
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function InputCustomUserPassword({
    placeholder,
    value,
    setValue,
    minLength,
    showError,
    editable = true
}: any) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={!isPasswordVisible}
                    style={[styles.input, !editable && styles.inputDisabled]}
                    editable={editable}
                    placeholderTextColor={colorConstants.formTextColor}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.iconWrapper}
                >
                    <Icon
                        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
                {showError && (
                    <Text style={styles.errorText}>
                        A senha deve ter no mínimo {minLength} caracteres
                    </Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorConstants.formBackgroundColor,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: colorConstants.formTextColor
    },
    inputDisabled: {
        backgroundColor: '#e0e0e0',
        color: '#999',
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
    errorContainer: {
        height: 20,
        justifyContent: 'center',
    },
    errorText: {
        color: colorConstants.formTextWarningColor,
        fontSize: 12,
    },
});
