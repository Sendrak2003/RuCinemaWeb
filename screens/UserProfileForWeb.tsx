import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import useSWR from 'swr';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperTextInput, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

interface CurrentUserResponse {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    dateOfBirth: string | null;
}

const fetcher = async (url: string): Promise<CurrentUserResponse> => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status >= 400) {
        throw new Error(response.data.message || 'Error fetching user data.');
    }
    return response.data;
};

const UserProfileScreen = () => {
    const { data: currentUser, error, isLoading } = useSWR(
        'http://rucinema34-001-site1.gtempurl.com/api/Auth/me',
        fetcher
    );

    // Custom theme for react-native-paper
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            text: 'black',
            placeholder: 'black',
        },
    };

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>Error: {error.message}</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading user data...</Text>
            </View>
        );
    }

    if (currentUser) {
        const dateOfBirthParts = currentUser.dateOfBirth?.split('-') || [];
        const day = dateOfBirthParts[2]?.split('T')[0] || 'N/A';
        const month = dateOfBirthParts[1] || 'N/A';
        const year = dateOfBirthParts[0] || 'N/A';

        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: currentUser.photo }}
                        style={styles.userPhoto}
                    />
                    <PaperTextInput
                        label="Имя и фамилия"
                        value={`${currentUser.firstName} ${currentUser.lastName}`}
                        editable={false}
                        style={styles.textInput}
                    />
                    <PaperTextInput
                        label="Email"
                        value={currentUser.email}
                        editable={false}
                        style={styles.textInput}
                    />
                    <PaperTextInput
                        label="Дата рождения"
                        value={`${day}/${month}/${year}`}
                        editable={false}
                        style={styles.textInput}
                    />
                </View>
            </PaperProvider>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.noUserText}>User not found. Please login.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 18,
        color: 'red',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
    },
    noUserText: {
        fontSize: 18,
    },
    textInput: {
        marginTop: 10,
        width: '90%',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
});

export default UserProfileScreen;
