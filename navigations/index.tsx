import {Provider} from 'react-native-paper';
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'; 
import { NavigationContainer, NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native"; 
import ShowAllMovieForWeb from '../screens/MovieList/ShowAllMovieForWeb'; 
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'; 
import Feather from '@expo/vector-icons/Feather';
import { View,StyleSheet, Text, ImageBackground, Image, TouchableOpacity  } from 'react-native';
import Search from '../screens/SearchScreen/SearchMovieForWeb';
import ShowDetailsMovieForWeb from '../screens/MovieDetails/MovieDetails';
import ReviewCommentsForWeb from '../screens/ReviewCommentsScreen/ReviewCommentsForWeb'; 
import LoginScreenForWeb from '../screens//LoginScreen/LoginScreenForWeb'; 
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileForWeb from '../screens/UserProfileForWeb';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

type RootStackParamList = {
  HomeTab: undefined; // Если на этом экране нет параметров
  MoviesDrawer: undefined; // Если на этом экране нет параметров
  Search: undefined; // Если на этом экране нет параметров
  Login: undefined; // Если на этом экране нет параметров
  UserProfile: undefined; // Если на этом экране нет параметров
  ShowDetailsMovieForAndroid: { movieId: number }; 
  ReviewComments: { reviewId: number };
};
function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, 
      }} 
      initialRouteName="HomeTab" 
    >
      <Stack.Screen name="HomeTab" component={WelcomeScreen} 
       options={{ title: 'Главная' }} 
      />
      <Stack.Screen name="Login" component={LoginScreenForWeb} 
       options={{
        headerShown: true,
         title: 'Авториззция' ,
         headerStyle: { backgroundColor: '#593EFF' },
         headerTitleStyle: { color: '#fafafa' }, 
         headerTintColor: '#fafafa',
        }} 
      />
      <Stack.Screen name="Movies" component={MoviesDrawer} 
       options={{ title: 'Фильмы' }} 
      />
      <Stack.Screen name="Search" component={Search} 
       options={{ title: 'Поиск' }} 
      />
      <Stack.Screen name="MovieDetails" component={ShowDetailsMovieForWeb} 
       options={{ title: 'Детали' }} 
      />
      <Stack.Screen name="UserProfile" component={UserProfileForWeb} 
        options={{
          headerShown: true,
          title: 'Профиль' ,
          headerStyle: { backgroundColor: '#593EFF' },
          headerTitleStyle: { color: '#fafafa' }, 
          headerTintColor: '#fafafa',
          }} 
      />
      <Stack.Screen
      name="ReviewComments"
      component={ReviewCommentsForWeb}
      options={{
        title: 'Комментарии',
        headerShown: true,
        headerTitle: 'Отзывы',
        headerStyle: { backgroundColor: '#593EFF' },
        headerTitleStyle: { color: '#fafafa' }, 
        headerTintColor: '#fafafa',
      }}
    />

    </Stack.Navigator>
  );
}


function MoviesDrawer() {
  const navigation: NavigationProp<RootStackParamList, 'MoviesDrawer'> = useNavigation();
  const [userInfo, setUserInfo] = useState<{
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      photo: string
  } | null>(null);

  const updateUserInfo = async () => {
    const userInfoJson = await AsyncStorage.getItem('userInfo');
    if (userInfoJson) {
      setUserInfo(JSON.parse(userInfoJson));
    }
  };

  useFocusEffect(
    useCallback(() => {
      updateUserInfo();
    }, [])
  );

  const handleProfilePress = () => {
    if (userInfo) {
      navigation.navigate('UserProfile');
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUserInfo(null);
    navigation.goBack();
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
        <TouchableOpacity style={styles.userInfoContainer} onPress={handleProfilePress}>
          {userInfo && (
            <>
              <Image
                source={{ uri: userInfo.photo }}
                style={styles.userPhoto}
              />
              <Text style={styles.userName}>
                {`${userInfo.firstName} ${userInfo.lastName}`}
              </Text>
              <DrawerItem
                label={() => <Text style={{ color: 'white' }}>Выход</Text>}
                
                onPress={handleLogout}
                style={styles.bottomDrawerItem}
              />
            </>
          )}
          {!userInfo && (
            <DrawerItem
              label={() => <Text style={{ color: 'white' }}>Вход</Text>}
              icon={() => <Feather name="log-in" size={24} color="#fafafa" />}
              onPress={() => navigation.navigate('Login')}
              style={styles.bottomDrawerItem}
            />
          )}
          
        </TouchableOpacity>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      )}
      initialRouteName="Film"
      screenOptions={{
        headerStyle: { backgroundColor: "#593EFF" },
        headerTintColor: "white",
        headerTitle: "RuCinema",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: "white",
        drawerActiveBackgroundColor: "white",
        drawerActiveTintColor: "#593EFF",
        drawerStyle: { backgroundColor: "#593EFF" },
        headerRight: () => (
          <Feather
            name="search"
            size={24}
            color="white"
            style={{ marginHorizontal: '4%' }}
            onPress={() => navigation.navigate('Search')}
          />
        )
      }}
    >
      <Drawer.Screen
        name="Film"
        component={ShowAllMovieForWeb}
        options={{
          drawerLabel: "Фильм",
          headerShown: true,
        }}
        initialParams={{ contentTypeName: 'Фильм' }}
      />
      <Drawer.Screen
        name="Serial"
        component={ShowAllMovieForWeb}
        options={{
          drawerLabel: "Сериал",
          headerShown: true,
        }}
        initialParams={{ contentTypeName: 'Сериал' }}
      />
    </Drawer.Navigator>
  );
}




const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#593EFF',
  },
  userInfoContainer: {
      flex: 1,
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding:'5%'
  },
  userName: {
      color: 'white',
      fontSize: 18,
      marginBottom: 10,
  },
  bottomDrawerItem: {
      width: '100%',
      marginVertical: 5,
      borderBottomColor: '#ccc',
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
 
});

const AppNavigationConfig = () => {
  return (
    <Provider>
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigationConfig;
