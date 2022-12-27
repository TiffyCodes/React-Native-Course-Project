// import { useState } from 'react';
import { Image, Text, Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
// import { CAMPSITES } from '../shared/campsites';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import{ createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ReservationScreen from './ReservationScreen';
import { Icon } from 'react-native-elements';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/commentsSlice'; 
//below we will import what we did on the Favorites screen; then add a astack navigator
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
}
    

const HomeNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='Home'
                component= {HomeScreen}
                options={({navigation}) => ({ 
                    title: 'Home',
                    headerLeft: () => (
                        <Icon 
                        name='home'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='About'
                component= {AboutScreen}
                options={({navigation}) => ({ 
                    headerLeft: () => (
                        <Icon 
                        name='info-circle'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

const ContactNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='Contact'
                component= {ContactScreen}
                options={({navigation}) => ({ 
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon 
                        name='address-card'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

const ReservationNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='Reservation'
                component= {ReservationScreen}
                options={({navigation}) => ({ 
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon 
                        name='tree'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

//for Favorites Screen:
const FavoritesNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='Favorites'
                component= {FavoritesScreen}
                options={({navigation}) => ({ 
                    title: 'Favorite Campsites',
                    headerLeft: () => (
                        <Icon 
                        name='heart'
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

const LoginNavigator = () => {
    const Stack= createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen 
                name='Login'
                component= {LoginScreen}
                options={({navigation, route }) => ({ 
                    headerTitle: getFocusedRouteNameFromRoute(route),
                    headerLeft: () => (
                        <Icon 
                        name={
                            getFocusedRouteNameFromRoute(route) ===
                            'Register'
                                ? 'user-plus'
                                : 'sign-in'
                        }
                        type='font-awesome'
                        iconStyle={styles.stackIcon}
                        onPress={()=> navigation.toggleDrawer()}
                        />
                )
            })}
            />
        </Stack.Navigator>
    );
};

// Creating fx component to return our stack nav code for Directory and Campsite info screens
const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    //this method returns an obj wiht two properties- screen and navigator which are both react components use to configure the stack nav
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >    
        <Stack.Screen 
            name='Directory'
            component={DirectoryScreen}
            // above is the component in charge of displaying the screen
            // options={{title: 'Campsite Directory' }}
            // the above (object with a property of title) will be displayed in the nav header
            options={({navigation}) => ({ 
                title: 'Campsite Directory',
                headerLeft: () => (
                    <Icon 
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={()=> navigation.toggleDrawer()}
                    />
            )
        })}
        />

        <Stack.Screen 
            name='CampsiteInfo'
            component={CampsiteInfoScreen}
            // above is the component in charge of displaying the screen
            options={({ route }) => ({
                // we'll set it equal to a fx that returns an obj (surround curly braackets of obj literal in parenthesis so clear not a fx body)
                title: route.params.campsite.name
                // sets the title of the campsite info screen the name of the specific campsite
            })}
            // the above (object with a property of title) will be displayed in the nav header
        />

        
        </Stack.Navigator>  
    );
}

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2}}>
                <Text style={styles.drawerHeaderText}>NuCamp</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
);


const Main = () => {
    //****** NO longer needed */
    // const [campsites, setCampsites] = useState(CAMPSITES);
        //set fx for setting the variable will be "setCampsites"
    // const [selectedCampsiteId, setSelectedCampsiteId] = useState();
    //********************* */

    const dispatch = useDispatch();

    //when app loaded, the Main component will get mounted and the useEffect hook will get called and the data will be fetched and loaded into the redux store, making it available for all of our components to access and to make changes to if necessary
    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPromotions());
        dispatch(fetchPartners());
        dispatch(fetchComments());
    }, [dispatch]);
    //above is passing the dispatch fx in the dependancy array, not req'd since it doesn't change, but it is best practice
    return (
        <View 
            style= {{ 
                flex: 1, 
                // above flex: 1 will cause directory screen and campsite info scree to fill the entire space
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight  
                // we imported platform to have a diff padding top depending on operating system (iOS vs Android so less discrepancies)
            }}
        >
            <Drawer.Navigator 
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
                >
                    <Drawer.Screen 
                        name='Login'
                        component={LoginNavigator}
                        options={{ 
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                        )  }}
                    />
                    
                    <Drawer.Screen 
                        name='Home'
                        component={HomeNavigator}
                        options={{ 
                            title: 'Home',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                            ) 
                        }}
                    />
                    <Drawer.Screen 
                        name='Directory'
                        component={DirectoryNavigator}
                        options={{ 
                            title: 'Campsite Directory',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                        )  }}
                    />
                    <Drawer.Screen 
                        name='ReserveCampsite'
                        component={ReservationNavigator}
                        options={{ 
                            title: 'Reserve Campsite',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                        )  }}
                    />

                    {/* //for Favorites Screen: */}
                    <Drawer.Screen 
                        name='Favorites'
                        component={FavoritesNavigator}
                        options={{ 
                            title: 'My Favorites',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='heart'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                        )  }}
                    />

                    <Drawer.Screen 
                        name='About'
                        component={AboutNavigator}
                        options={{
                            title: 'About',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                            ) 
                        }}
                    />
                    <Drawer.Screen 
                        name='Contact'
                        component={ContactNavigator}
                        options={{ 
                            title: 'Contact Us',
                            drawerIcon: ({ color })=> (
                                <Icon 
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24}}
                                color= {color}
                                />
                        )  
                    }}
                    />
                    
                </Drawer.Navigator>
        
        
        {/* ********** No longer Needed - replaced with above*/}
            {/* <DirectoryScreen 
                campsites={campsites} 
                onPress={(campsiteId)=> setSelectedCampsiteId(campsiteId)}
            />
            <CampsiteInfoScreen
                campsite={
                    campsites.filter(
                        (campsite) => campsite.id === selectedCampsiteId
                    )[0]
                }
            /> */}
        {/* ********************** */}


        </View>
    );
};

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    }
});


export default Main;