// import { useState } from 'react';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
// import { CAMPSITES } from '../shared/campsites';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import{ createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';


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
                options={{ title: 'Home'}}
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
                options={{ title: 'Contact Us'}}
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
            options={{title: 'Campsite Directory' }}
            // the above (object with a property of title) will be displayed in the nav header
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




const Main = () => {
    //****** NO longer needed */
    // const [campsites, setCampsites] = useState(CAMPSITES);
        //set fx for setting the variable will be "setCampsites"
    // const [selectedCampsiteId, setSelectedCampsiteId] = useState();
    //********************* */
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
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
                >
                    <Drawer.Screen 
                        name='Home'
                        component={HomeNavigator}
                        options={{ title: 'Home' }}
                    />
                    <Drawer.Screen 
                        name='About'
                        component={AboutNavigator}
                    />
                    <Drawer.Screen 
                        name='Contact'
                        component={ContactNavigator}
                        options={{ title: 'Contact Us' }}
                    />
                    <Drawer.Screen 
                        name='Directory'
                        component={DirectoryNavigator}
                        options={{ title: 'Directory' }}
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

export default Main;