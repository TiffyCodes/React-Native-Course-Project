import { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
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
                />

            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default LoginScreen;