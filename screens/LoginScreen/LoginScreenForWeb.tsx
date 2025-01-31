import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { HelperText, Text, TextInput, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { RootStackParamList } from './constants'; 

const LoginScreen = () => {
    const navigation: NavigationProp<RootStackParamList, 'Login'> = useNavigation();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorVisible, setErrorVisible] = useState<boolean>(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);

    const toggleShowPasswordLogin = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };

    const handleLogin = async () => {
        if (login === '' || password === '') {
            setErrorVisible(true);
            return;
        }
    
        try {
            const response = await axios.post('http://rucinema34-001-site1.gtempurl.com/api/Auth/login', {
                Email: login,
                Username: login,
                Password: password
            });
    
            if (response.status === 200) { 
                const { token, tokenExpiry, firstName, lastName, email, photo } = response.data; 
                
                await AsyncStorage.setItem('userToken', token); 
                await AsyncStorage.setItem('userTokenExpiry', tokenExpiry); 
                await AsyncStorage.setItem('userInfo', JSON.stringify({ firstName, lastName, email, photo })); 
                
                navigation.navigate('Movies');
            }
            
        } catch (error) {
            setErrorVisible(true);
            setLogin('');
            setPassword('');
            
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data?.message);
            } else if (error instanceof Error) {
                alert('Произошла ошибка: ' + error.message); 
            }
        }
    };

    const handleRegister = () => {
        // Логика регистрации
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
                <View style={styles.border}>
                    <Title style={styles.title}>Вход</Title>

                    {errorVisible && (
                        <Text style={styles.errorText}>
                            Неверный логин или пароль. Проверьте введенные данные и повторите попытку.
                        </Text>
                    )}

                    <TextInput
                        style={styles.input}
                        textColor='#000'
                        placeholder="Введите логин"
                        placeholderTextColor="#999999"
                        value={login}
                        onChangeText={setLogin}
                        left={<TextInput.Icon color="#593EFF" icon='account-circle' />}
                        theme={{ colors: { primary: '#00aaff' } }}
                    />

                    <TextInput
                        style={styles.input}
                        textColor='#000'
                        placeholder="Введите пароль"
                        placeholderTextColor="#999999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPasswordLogin}
                        maxLength={64}
                        theme={{ colors: { primary: '#00aaff' } }}
                        left={<TextInput.Icon color="#593EFF" icon='form-textbox-password' />}
                        right={
                            <TextInput.Icon
                                color="#593EFF"
                                onPress={toggleShowPasswordLogin}
                                icon={!showPasswordLogin ? 'eye-off' : 'eye'}
                            />
                        }
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.showMoreText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;
