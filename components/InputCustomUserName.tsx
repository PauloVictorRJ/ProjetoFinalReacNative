import { TextInput, Text, View } from "react-native";

export default function InputCustomUserName({ placeholder, value, setValue, minLenght, showError }: any) {
    return (
        <View style={{ width: '100%', marginBottom: 20, paddingHorizontal: 10 }}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={[{ marginHorizontal: 10 }]}
            />
            <View style={{ height: 20 }}>
                {showError && (
                    <Text style={{ color: 'red' }}>
                        O nome de usuário deve ter no mínimo {minLenght} caracteres
                    </Text>
                )}
            </View>
        </View>
    );
}
