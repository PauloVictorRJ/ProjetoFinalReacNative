import styled from 'styled-components/native';
import InputCustomUserName from '@/components/InputCustomUserName';
import InputCustomUserPassword from '@/components/InputCustomUserPassword';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { Alert, ActivityIndicator } from 'react-native';
import logo from '@/assets/images/infnet.png';
import { UserActionType, UserContext, UserDispacthContext } from '@/store/UserStore';
import { signInWithPassword } from './apiAuthService';


export default function Login() {
    const [isLoading, setLoading] = useState(false);
    const MIN_USERNAME_LENGTH = 8;
    const MIN_PASSWORD_LENGTH = 6;
    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispacthContext);
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

                if (status === 200) {
                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: data.email,
                            password: userPassword,
                            token: data.idToken
                        },
                    });
                    router.push('/(private)/maps');
                } else if (status === 400) {
                    Alert.alert(`${data.error.message}`);
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } catch (error: any) {
                Alert.alert('Erro', error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeArea>
            <Container>
                <LogoContainer>
                    <Logo source={logo} resizeMode="contain" />
                </LogoContainer>
                <FormContainer>
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
                        <Button onPress={loginAction} accessibilityLabel="Cadastrar">
                            <ButtonText>Cadastrar</ButtonText>
                        </Button>
                    )}
                    {isLoading && <ActivityIndicator size="large" />}
                </FormContainer>
            </Container>
        </SafeArea>
    );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LogoContainer = styled.View`
  margin-bottom: 30px;
`;

const Logo = styled.Image`
  width: 200px;
  height: 80px;
`;

const FormContainer = styled.View`
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
