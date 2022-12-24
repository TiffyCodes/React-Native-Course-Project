import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

const ReservationScreen = () => {
    //set up multiple state variables
    const [ campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [ date, setDate] = useState(new Date());
    const [ showCalendar, setShowCalendar ] = useState(false);
    // const [showModal, setShowModal] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    // const handleReservation= () => {
    //     console.log('campers: ', campers);
    //     console.log('hikeIn: ', hikeIn);
    //     console.log('date:', date);
    //     setShowModal(!showModal);
        
    // };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
            <Animatable.View
                animation = 'zoomIn'
                duration={2000}
                delay={1000}
            >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers:</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />

                    </Picker>
                </View>

                <View style ={styles.formRow}>
                    <Text style={styles.formLabel}>Hike In?</Text>
                    <Switch 
                        stle={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', dalse: null }}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date:</Text>
                    <Button 
                        onPress={() => setShowCalendar(!showCalendar)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>
                {/* doing the below so only shows up if first part is true */}
                {showCalendar && (
                    <DateTimePicker 
                        style={styles.formItem}
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}
                {/* below is button for the onDateChange fx way above combined with what is immediately above I think */}
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => {
                            Alert.alert(

                                // Option 1
                                'Begin search?',
                                `Number of Campers: ${campers}  
                                \nHike-In?: ${hikeIn ? 'Yes' : 'No'} 
                                \nDate : ${date.toLocaleDateString('en-US')}`,
                                [
                                //option 2 would be to put the above in a variable 1sst above calling Alert.alert
                                //      const message = `Number of Campers: ${campers}
                                //      \nHike-In? ${hikeIn}
                                //      \nDate: ${date.toLocaleDateString('en-US')}`;
                                //       Alert.alert(
                                //      'Begin Search?',
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                        onPress: () => resetForm()
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => resetForm()
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        title='Search Availability'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
                

                {/* **********REMOVING MODAL TO REPLACE WITH ALERT*********** */}
                {/* modal to follow */}
                {/* <Modal 
                    animationType='slide'
                    //can have a slide animation or fade animation or none
                    transparent={false}
                    //above makes opaque versus transparent
                    visible={showModal}
                    //so of showModal true, will show, if false, will not
                    onRequestClose={() => setShowModal(!showModal)}
                >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>
                                Search Campsite Reservation
                            </Text>
                            <Text style={styles.modalText}>
                                Number of Campers: {campers}
                            </Text>
                            <Text style={styles.modalText}>
                                Hike-In?: {hikeIn ? 'Yes' : 'No'}
                            </Text>
                            <Text style={styles.modalText}>
                                Date: {date.toLocaleDateString('en-US')}
                            </Text>
                            <Button 
                                onPress={() => {
                                    setShowModal(!showModal);
                                    resetForm();
                                }}
                                color= '#5637DD'
                                title= 'Close'
                            />
                        </View>
                </Modal> */}
                {/* **********REMOVED MODAL TO REPLACE WITH ALERT*********** */}
            
            </Animatable.View>
        </ScrollView>
    );
};

const styles= StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
    // modal : {
    //     justifyContent: 'center',
    //     margin: 20
    // },
    // modalTitle: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     backgroundColor: '#5637DD',
    //     textAlign: 'center',
    //     color: '#fff',
    //     marginBottom: 20
    // },
    // modalText: {
    //     fontSize: 18,
    //     margin: 10
    }

)

export default ReservationScreen;