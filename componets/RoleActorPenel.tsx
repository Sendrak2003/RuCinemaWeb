import React, { useState } from 'react'; 
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'; 
import axios from 'axios'; 
import useSWR from 'swr'; 
import Loading from './Loading'; 
import ErrorAlert from './ErrorAlert'; 

interface Actor { 
  actorId: number; 
  actorName: string; 
  roleName: string; 
  actorPhotoUrl: string; 
} 

interface ActorDetails { 
  countryName: string | null; 
  flagImage: string; 
  actorName: string; 
  movieTitles: string[]; 
  roles: { roleName: string; actorPhotoUrl: string }[]; 
} 

const ActorsList = ({ movieId }: { movieId: number }) => { 
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);  
  const [actorDetailsModalVisible, setActorDetailsModalVisible] = useState<boolean>(false); 
  const [actorDetails, setActorDetails] = useState<ActorDetails | null>(null); 

  const fetcher = async (uri: string): Promise<Actor[]> => { 
    try { 
      const response = await axios.get(uri); 
      return response.data; 
    } catch (error) { 
      throw error; 
    } 
  }; 

  const { data: actors, error } = useSWR<Actor[]>
  (`http://rucinema34-001-site1.gtempurl.com/api/RolesActors/movie/${movieId}`, fetcher); 

  const handleActorPress = async (actor: Actor) => { 
    setSelectedActor(actor); 

    try { 
      const response = await axios.get(`http://rucinema34-001-site1.gtempurl.com/api/Actors/${actor.actorId}`); 
      setActorDetails(response.data); 
      //console.log(response.data.roles[0].actorPhotoUrl)
      setActorDetailsModalVisible(true); 
    } catch (error) { 
      throw error;
    } 
  }; 

  if (error) { 
    return  <Text style={styles.error}>Ошибка при загрузке сведений о актёрах.</Text>
  } 

  if (!actors) { 
    return <Loading />; 
  } 

  return ( 
    <View style={styles.container}> 
      <ScrollView> 
        <View style={styles.actorsContainer}> 
          {actors.map((actor) => ( 
            <TouchableOpacity key={actor.actorId} onPress={() => handleActorPress(actor)}> 
              <View style={styles.actorItem}> 
                <Image source={{ uri: actor.actorPhotoUrl }} style={styles.actorImage} /> 
                <Text style={styles.actorName}>{actor.actorName}</Text> 
                <Text style={styles.actorRole}>{actor.roleName}</Text> 
              </View> 
            </TouchableOpacity> 
          ))} 
        </View> 
      </ScrollView> 

      <Modal
        animationType="slide"
        transparent={true}
        visible={actorDetailsModalVisible}
        onRequestClose={() => setActorDetailsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.modalContent}>
              {actorDetails && (
                <>
                  {actorDetails.roles[0].actorPhotoUrl && (
                   <View>
                      <Image source={{ uri: actorDetails.roles[0].actorPhotoUrl }} style={styles.roleImage} />
                   </View>
                  )}

                  <Text style={styles.modalTitle}>{actorDetails.actorName}</Text>

                  {actorDetails.flagImage && (
                    <Image source={{ uri: actorDetails.flagImage }} style={styles.flagImage} />
                  )}

                  <Text style={styles.modalText}>Страна: {actorDetails.countryName || 'Не указано'}</Text>

                  <Text style={styles.modalText}>Фильмы: {actorDetails.movieTitles.length > 0 ? actorDetails.movieTitles.join(', ') : 'Нет информации'}</Text>

                  <Pressable onPress={() => setActorDetailsModalVisible(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Закрыть</Text>
                  </Pressable>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View> 
  ); 
}; 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1 
  }, 
  actorsContainer: { 
    padding: 10 , 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  }, 
  actorItem: { 
    marginRight: 10, 
    padding: 10, 
  }, 
  actorImage: { 
    width: 100,
    height: 100 
  }, 
  actorName: { 
    fontWeight: 'bold', 
    color: '#fafafa' 
  }, 
  actorRole: {
     color: 'gray' 
  },  
  modalView: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },  
  modalContent: { 
    backgroundColor: '#593EFF',
    padding: 20, 
    borderRadius: 10 
  },  
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#fafafa' 
  },  
  modalText: { 
    marginVertical: 10,
    color: '#fafafa' 
  },  
  closeButton: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#2196F3', 
    borderRadius: 5 
  },  
  closeButtonText: { 
    color: 'white', 
    textAlign: 'center' 
  },  
  roleImage: { 
    width: '100%', 
    height: 200 
  },  
  flagImage: { 
    width: 50, 
    height: 30
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: { 
    color: 'red', 
  },  
}); 

export default ActorsList;
