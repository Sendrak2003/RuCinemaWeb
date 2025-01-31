import React, { useState } from 'react'; 
import { View, Text, StyleSheet, ActivityIndicator, Modal, Button, Image, ScrollView } from 'react-native'; 
import useSWR from 'swr'; 
import axios from 'axios'; 
import Loading from './Loading';

interface Award { 
    awardId: number; 
    movieId: number; 
    awardName: string; 
    awardYear: number; 
    awardPhotoUrl: string | null; 
} 

interface AwardsCardProps { 
    movieId: number;
} 

const fetcher = (url: string) => axios.get(url).then(res => res.data); 

const AwardsCard: React.FC<AwardsCardProps> = ({ movieId }) => { 
    const [modalVisible, setModalVisible] = useState<boolean>(false); 
    const { data: awards, error } = useSWR<Award[]>( 
        `http://rucinema34-001-site1.gtempurl.com/api/Awards/movie/${movieId}`,  
        fetcher 
    ); 

    const handleCloseModal = () => { 
        setModalVisible(false); 
    }; 

    if (error) { 
        return ( 
            <View style={styles.container}> 
                <Text style={styles.error}>Ошибка при получении наград</Text> 
            </View> 
        ); 
    } 

    return ( 
        <View style={styles.container}> 
            <Button title="Показать награды" onPress={() => setModalVisible(true)} /> 

            <Modal transparent={true} visible={modalVisible} animationType="slide"> 
                <View style={styles.modalOverlay}> 
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                        {awards ? ( 
                            <> 
                                {awards.map((award: Award) => ( 
                                    <View key={award.awardId} style={styles.awardContainer}> 
                                        {award.awardPhotoUrl ? ( 
                                            <View> 
                                                <Image 
                                                    source={{ uri: award.awardPhotoUrl }} 
                                                    style={styles.awardImage} 
                                                    resizeMode="cover" 
                                                /> 
                                                <Text style={styles.title}>{award.awardName}</Text> 
                                                <Text>Год: {award.awardYear}</Text> 
                                            </View> 
                                        ) :  
                                            <View style={styles.awardContainer}> 
                                                <Image 
                                                    source={require('../assets/images/plug_popup_brands.png')} 
                                                    style={styles.awardImage} 
                                                    resizeMode="cover" 
                                                /> 
                                                <Text style={styles.title}>{award.awardName}</Text> 
                                                <Text>Год: {award.awardYear}</Text> 
                                            </View> 
                                        } 
                                    </View> 
                                ))} 
                            </> 
                        ) : ( 
                            <Loading/>
                        )} 
                    </ScrollView>
                    <Button title="Закрыть" onPress={handleCloseModal} /> 
                </View> 
            </Modal> 
        </View> 
    ); 
}; 

const styles = StyleSheet.create({ 
    container: { 
        padding: 20, 
    }, 
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    awardContainer: { 
        width: '100%',
        marginBottom: 10, 
        padding: 10, 
        backgroundColor: '#593EFF',
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }, 
    awardImage: { 
        width: 100, 
        height: 100, 
        marginBottom: 10, 
    }, 
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: '#fafafa'  
    }, 
    error: { 
        color: 'red', 
    },
});

export default AwardsCard;
