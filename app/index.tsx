import styled from 'styled-components/native';
import InputCustomUserName from '../components/InputCustomUserName';
import InputCustomUserPassword from '../components/InputCustomUserPassword';
import React, { useContext, useState } from 'react';
import { router } from 'expo-router';
import { Alert, ActivityIndicator, StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import logo from '../assets/images/infnet.png';
import { UserActionType, UserContext, UserDispacthContext } from '../store/UserStore';
import signInWithPassword from './apiAuthService';
import { colorConstants } from "../styles/Global.styles"

export default function Login() {
    const MIN_USERNAME_LENGTH = 8;
    const MIN_PASSWORD_LENGTH = 6;

    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispacthContext);

    const [isLoading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState(userAuth?.email ?? '');
    const [userPassword, setPassword] = useState(userAuth?.password ?? '');
    const [showUserError, setShowUserError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    const handleUserNameChange = (value: string) => {
        setUserEmail(value);
        if (showUserError) setShowUserError(false);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (showPasswordError) setShowPasswordError(false);
    };

    const loginAction = async () => {
        const isUserNameValid = userEmail.length >= MIN_USERNAME_LENGTH;
        const isPasswordValid = userPassword.length >= MIN_PASSWORD_LENGTH;

        setShowUserError(!isUserNameValid);
        setShowPasswordError(!isPasswordValid);

        if (!isUserNameValid || !isPasswordValid) return;

        setLoading(true);

        if (isUserNameValid && isPasswordValid) {
            try {
                const { status, data } = await signInWithPassword(userEmail, userPassword);
                switch (status) {
                    case 200:
                        userAuthDispatch({
                            type: UserActionType.LOGAR,
                            user: {
                                email: data.email,
                                password: userPassword,
                                token: data.idToken
                            },
                        });
                        router.push('/(private)/maps');
                        break;
                    case 400:
                        Alert.alert('Erro', data.error.message);
                        break;
                    default:
                        Alert.alert('Erro', `Status inesperado: ${status}`);
                }
            } catch (error: any) {
                Alert.alert('Erro', error?.message || 'Ocorreu um erro desconhecido');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo source={logo} resizeMode="contain" />
                </View>
                <View style={styles.formContainer}>
                    <InputCustomUserName
                        placeholder="Digite seu usuário"
                        value={userEmail}
                        minLength={MIN_USERNAME_LENGTH}
                        setValue={handleUserNameChange}
                        showError={showUserError}
                        editable={!isLoading}
                    />
                    <InputCustomUserPassword
                        placeholder="Digite sua senha"
                        value={userPassword}
                        minLength={MIN_PASSWORD_LENGTH}
                        setValue={handlePasswordChange}
                        showError={showPasswordError}
                        editable={!isLoading}
                    />
                    {!isLoading && (
                        <TouchableOpacity onPress={loginAction} accessibilityLabel="Login" style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    )}
                    {isLoading && <ActivityIndicator size="large" />}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colorConstants.backgroundColor,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: colorConstants.btnColor,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

const Logo = styled.Image`
  width: 200px;
  height: 80px;
`;

