import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const LoginTab = ( {navigation} ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    //"event handler" fx
    const handleLogin = () => {
        console.log('Username: ', username);
        console.log('Password: ', password);
        console.log('Remember? ', remember);

        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                // Argument 2(BELOW): A stringified object containing the username and password state variables. (BELOW)
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error))
            //using a .catch() method that will check for a rejected promise (resulting in an error since will return a promise) and will log the error to the console.
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) => 
            console.log('Could not delete user info', error));
            //if remember is not checked, we want to delete the data stored under the key of user info.  If there is no data, nothing happens, but if there is but an error deleting it- it will return a promise and we will log an error msg to the console
        }
    };

    //Ensures the user info is retrieved from the secure store when the components moounts (1x so empty array for dependencies)
    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
        //above will return a promise that, if resolved, will return the value stored undeer that key so we can access that value using the .then()
        const userinfo = JSON.parse(userdata);
        //above JSON.parse makes it a JS object
        if (userinfo) {
            setUsername(userinfo.username);
            setPassword(userinfo.password);
            setRemember(true);
        }
        });
    }, []);

    return (
        // Note: To be compatible with smaller phone screen sizes (such as the iPhone 5S), you may wish to replace <View style={styles.container}> being returned from the LoginTab and RegisterTab components in the above code with <ScrollView style={styles.container}>.
        <View style={styles.container}>
            <Input 
                placeholder='Username'
                leftIcon={{
                    type:'font-awesome',
                    name: 'user-o'
                }}
                onChangeText={(text) => setUsername(text)}
                //above's directions: onChangeText equal to a function with text as the parameter and a call to setUsername(text) in the body.
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />

            <Input 
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox 
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />

            <View style={styles.formButton}>
                <Button 
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                    icon= {
                        <Icon 
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    buttonStyle={{ backgroundColor: '#5637DD' }}
                />
            </View>

            <View style={styles.formButton}>
                <Button 
                    onPress={() => navigation.navigate('Register')}
                    title='Register'
                    type='clear'
                    icon= {
                        <Icon 
                            name='user-plus'
                            type='font-awesome'
                            color='blue'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    titleStyle={{ color: 'blue' }}
                />
            </View>
            
        </View>
    );
};


const RegisterTab = () => {
    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [firstName, setFirstName]= useState('');
    const [lastName, setLastName]= useState('');
    const [email, setEmail]= useState('');
    const [remember, setRemember]= useState(false);

    const handleRegister = () => {
        const userInfo = {
            username,
            password,
            firstName,
            lastName,
            email,
            remember
        };
        console.log(JSON.stringify(userInfo));
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                // Argument 2(BELOW): A stringified object containing the username and password state variables. (BELOW)
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error))
            //using a .catch() method that will check for a rejected promise (resulting in an error since will return a promise) and will log the error to the console.
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) => 
            console.log('Could not delete user info', error));
            //if remember is not checked, we want to delete the data stored under the key of user info.  If there is no data, nothing happens, but if there is but an error deleting it- it will return a promise and we will log an error msg to the console
        };
    };

    return (
        <ScrollView>
            <View style={styles.container}>
            <Input 
                placeholder='Username'
                leftIcon={{
                    type:'font-awesome',
                    name: 'user-o'
                }}
                onChangeText={(text) => setUsername(text)}
                //above's directions: onChangeText equal to a function with text as the parameter and a call to setUsername(text) in the body.
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />

            <Input 
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input 
                placeholder='First Name'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input 
                placeholder='Last Name'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input 
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox 
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />

            <View style={styles.formButton}>
                <Button 
                    onPress={() => handleRegister()}
                    title='Register'
                    color='#5637DD'
                    icon= {
                        <Icon 
                            name='user-plus'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    buttonStyle={{ backgroundColor: '#5637DD' }}
                />
            </View>
            
        </View>
        </ScrollView>
    );
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: '#5637DD',
    inactiveBackgroundColor: '#CEC8FF',
    activeTintColor: '#fff',
    inactiveTintColor: '#808080',
    labelStyle: { fontSize: 16 }
    };

    return (
     <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen 
            name='Login'
            component={LoginTab}
            options={{
                tabBarIcon:(props) => {
                    return (
                        <Icon 
                            name='sign-in'
                            type='font-awesome'
                            color={props.color}
                        />
                    );
                }
            }}
        />
        <Tab.Screen 
            name='Register'
            component={RegisterTab}
            options={{
                tabBarIcon:(props) => {
                    return (
                        <Icon 
                            name='user-plus'
                            type='font-awesome'
                            color={props.color}
                        />
                    );
                }
            }}
        />
    </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    }
});

export default LoginScreen;