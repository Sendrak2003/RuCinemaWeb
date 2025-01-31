import React, { useEffect, useRef, useState } from 'react';   
import {Button, View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, ActivityIndicator } from 'react-native';   
import { Video, ResizeMode, VideoFullscreenUpdate, AVPlaybackStatus } from 'expo-av';   
import * as ScreenOrientation from 'expo-screen-orientation';  
import useSWR from 'swr';
import axios from 'axios';

interface Episode {
  episodeTitle(episodeTitle: any): unknown;
  episodeId: number;
  episodeNumber: number;
  title: string;
  fileUrl: string;
  duration: string
}

const EpisodePanel: React.FC<{ movieId: number }> = ({ movieId }) => {
    const [modalVisible, setModalVisible] = useState(false); 
    const videoRef = useRef<Video>(null); 
    const [isFullscreen, setIsFullscreen] = useState(false); 
    const [selectedVideo, setSelectedVideo] = useState<string>(''); 
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [selectedVideoEpisodeTitle, setSelectedEpisodeTitle] = useState<string>(''); 
    const [isLoadingMainVideo, setIsLoadingMainVideo] = useState(true); 
    const [isBuffering, setIsBuffering] = useState(false); 
    const webVideoRef = useRef<HTMLVideoElement | null>(null)


  // SWR fetcher function
  const fetcher = async (uri: string) => {
    try {
      const response = await axios.get(uri);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Получение данных об эпизодах
  const { data: episodes = [], error } = useSWR<Episode[]>(
    `http://rucinema34-001-site1.gtempurl.com/api/Episodes/ByMovie/${movieId}`,
    fetcher
  );

useEffect(() => { 
  if (episodes.length > 0) { 
      setSelectedEpisodeTitle(episodes[currentIndex].title); 
      setSelectedVideo(episodes[currentIndex].fileUrl); 
      webVideoRef.current?.addEventListener('loadedmetadata', () => {
       
        setIsLoadingMainVideo(false);
      });

      webVideoRef.current?.addEventListener('waiting', () => {
       
        setIsBuffering(true);
      });

      webVideoRef.current?.addEventListener('ended', () => {
        
        setIsBuffering(false);
      });

      webVideoRef.current?.addEventListener('fullscreenchange', () => {
        
        setIsFullscreen(!isFullscreen);
      });
  } 
}, [episodes, currentIndex]);

    // Рендеринг элемента эпизода
    const renderEpisodeItem = ({ item, index }: { item: Episode; index: number }) => (
            <TouchableOpacity 
            style={styles.episodeItem} 
            onPress={async () => { 
                if (webVideoRef.current) { 
                    await webVideoRef.current.pause(); 
                    setSelectedVideo(item.fileUrl); 
                    setSelectedEpisodeTitle(item.title); 
                    setModalVisible(false); 
                    await webVideoRef.current.play(); 
                } 
            }} 
        > 
            <View style={styles.previewContainer}> 
            <Video 
                    source={{ uri: item.fileUrl }} 
                    rate={2.0} 
                    volume={0} 
                    resizeMode={ResizeMode.STRETCH} 
                    isMuted={true} 
                    shouldPlay={true} 
                    isLooping={false} 
                    useNativeControls={false} 
                    style={styles.previewVideo} 
                    
                /> 
            </View> 

            <View style={styles.infoContainer}> 
                <Text style={styles.episodeTitle}>{item.title}</Text> 
                <Text style={styles.episodeDuration}>{item.duration}</Text> 
            </View> 

            
        </TouchableOpacity> 
    );


  return (
    <View>
        <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {episodes.length > 0 ? (
              <FlatList
                data={episodes}
                renderItem={renderEpisodeItem}
                keyExtractor={(item) => item.title}
                contentContainerStyle={styles.contentContainer}
              />
            ) : (
              <Text style={styles.emptyText}>Нет доступных эпизодов</Text>
            )}
            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      

      <video 
        ref={webVideoRef} 
        src={selectedVideo} 
        width="100%" 
        height="auto" 
        controls 
        onPlay={() => {
          setIsLoadingMainVideo(true);
          setIsBuffering(false);
        }}
        
      >
        
      </video>

      <TouchableOpacity style={styles.panel} onPress={() => setModalVisible(true)}>
        <Text style={styles.panelText}>{selectedVideoEpisodeTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 10,
      },
      episodeTile: {
        width: 150,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
        alignItems: 'center',
      },
      episodeNumber: {
        backgroundColor: '#2496ff',
        borderRadius: 50,
        padding: 8,
        marginBottom: 10,
      },
      episodeNumberText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      episodeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      },
      episodeTitle: {
        color: '#fafafa',
        fontSize: 14,
        fontWeight: 'bold',
      },
      downloadButton: {
        backgroundColor: '#2496ff',
        borderRadius: 5,
        padding: 8,
      },
    episodeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      
      },
      previewContainer: {
        width: 100,
        height: 70,
        marginRight: 15,
        borderRadius: 8,
        overflow: 'hidden',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      modalContent: {
        backgroundColor: '#593EFF',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        width: '90%', 
      },
      emptyText: {
        textAlign: 'center',
        marginTop: 20,
      },
      previewVideo: {
        width: '100%',
        height: '100%',
      },
      infoContainer: {
        flex: 1,
      },
      episodeDuration: {
        fontSize: 14,
        color: '#888',
      },
    episodeItemText: {
      fontSize: 16,
    },
    loadingIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainVideo: {
      width: '100%',
      height: 300, 
    },
    panel: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#1E90FF',
      marginBottom: 10,
    },
    panelText: {
      color: '#fafafa',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default EpisodePanel;

