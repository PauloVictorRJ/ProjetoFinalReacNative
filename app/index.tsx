import InputCustomUserName from '@/components/InputCustomUserName';
import InputCustomUserPassword from '@/components/InputCustomUserPassword';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import globalStyles from '@/styles/globalStyles';
import logo from '@/assets/images/infnet.png';
import { UserActionType, UserContext, UserDispacthContext } from '@/store/UserStore';

export default function Login() {
    const MIN_USERNAME_LENGTH = 1;
    const MIN_PASSWORD_LENGTH = 1;
    const userAuth = useContext(UserContext)
    const userAuthDispatch = useContext(UserDispacthContext)
    const [userEmail, setUserEmail] = useState(userAuth?.email ?? '');
    const [userPassword, setPassword] = useState(userAuth?.password ?? '');
    const [showUserError, setShowUserError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const handleUserNameChange = (value: string) => {
        setUserEmail(value);
        if (showUserError) {
            setShowUserError(false);
        }
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (showPasswordError) {
            setShowPasswordError(false);
        }
    };

    const register = () => {
        const isUserNameValid = userEmail.length >= MIN_USERNAME_LENGTH;
        const isPasswordValid = userPassword.length >= MIN_PASSWORD_LENGTH;

        setShowUserError(!isUserNameValid);
        setShowPasswordError(!isPasswordValid);

        if (isUserNameValid && isPasswordValid) {
            const promiseResponse = fetch('http://dominio.com.br/auth', {
                method: 'GET',
                headers: {
                    'Authorization': 'token',
                    'Content-Type': 'application/json'
                },
                body: 'dados'
            })
            promiseResponse.then((response) => {
                userAuthDispatch({
                    type: UserActionType.LOGAR,
                    user: {
                        email: userEmail,
                        password: userPassword,
                        token: ''
                    }
                })
                router.push('/maps')
            }); promiseResponse.catch((error) => { Alert.alert(error.mess) })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={globalStyles.container}>
                <View style={globalStyles.logoContainer}>
                    <Image
                        source={logo}
                        style={globalStyles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={globalStyles.formContainer}>
                    <InputCustomUserName
                        placeholder='Digite seu usuário'
                        value={userEmail}
                        minLength={MIN_USERNAME_LENGTH}
                        setValue={handleUserNameChange}
                        showError={showUserError}
                    />
                    <InputCustomUserPassword
                        placeholder='Digite sua senha'
                        value={userPassword}
                        minLength={MIN_PASSWORD_LENGTH}
                        setValue={handlePasswordChange}
                        showError={showPasswordError}
                    />
                    <TouchableOpacity
                        onPress={register}
                        style={globalStyles.button}
                        accessibilityLabel="Cadastrar"
                    >
                        <Text style={globalStyles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}