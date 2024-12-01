import { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function InputCustomUserPassword({ placeholder, value, setValue, minLenght, showError
}: any) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={{ width: '100%', marginBottom: 20, paddingHorizontal: 10 }}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={!isPasswordVisible}
                    style={{ flex: 1 }}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={{ paddingHorizontal: 10 }}>
                    <Icon
                        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: 20 }}>
                {showError && (
                    <Text style={{ color: 'red' }}>A senha deve ter no mínimo {minLenght} caracteres</Text>
                )}
            </View>
        </View>
    );
}
