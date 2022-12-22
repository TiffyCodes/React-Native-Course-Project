import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
//the above lets you see the loading component while it is loading
import { baseUrl } from '../shared/baseUrl';
//the above allows us to get our images from json server
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import * as Animatable from 'react-native-animatable';


const FavoritesScreen = ({navigation }) => {
//above is destructuring the navigation prop in the parameter list
    //need state data from the redux store for campsites and favorites- neeed useSelector
    const { campsitesArray, isLoading, errMess } = useSelector((state) => state.campsites);
    //above destructures the three from the return value of useSelector returning the states.campsites portion of our state
    //here is diff from before when we've used this hook before, but since we know the states.campsites property will return an object, we are just using destructuring to create indiv variables from the properties of that object
    
    const favorites = useSelector((state) => state.favorites);
    //the above will return the array from the redux store

    const dispatch = useDispatch(); 

    //create a renderFavoriteItem fx that we will use in the FlatList (further below)
    const renderFavoriteItem = ({ item: campsite }) => {
        //destructure item from the data array like above, calling item "campsite" as new name which will come in handy when calling Navigate method, and then we will return the ListItem component
        return (
            <SwipeRow rightOpenValue={-100}>
                {/* above so if you swipe from right to left at least 100px then it will show up */}
                {/* the first view is the hidden view with the extra options, so put the ListView in the 2nd view so shows up as default */}
                <View style={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        // onPress={() => dispatch(toggleFavorite(campsite.id))}
                        // ^^ replaced the above that deleted the favorite right away, with an alert below
                        onPress={() => Alert.alert('Delete Favorite?', 
                            'Are you sure you wish to delete the favorite campsite ' + campsite.name + '?',
                            // below is an array of buttons
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(campsite.name + 'Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => dispatch(toggleFavorite(campsite.id))
                                }
                            ],
                            {cancelable: false}
                            // **COOL FEATURE- above makes it so user can't tap outside of box to not select cancel or delete, must select one
                        )}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress={() => navigation.navigate('Directory', {
                            //above we are calling the navigation prop's navigate fx; earlier we navigated from Directory to Info screen, we were in the same stack navigator, but here, no, we have to tell the navigate method specifcally which navigator to use and which screen which you DON'T need to do like when you went from CampsiteInfo to Directory
                            screen: 'CampsiteInfo',
                            params: { campsite } 
                            //params set to an object with a key of campsites equal to our campsites object, so can shorthand to just campsite
                        })
                    }
                    >
                        <Avatar rounded source ={{ uri: baseUrl + campsite.image }} />
                        <ListItem.Content>
                            <ListItem.Title>{campsite.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {campsite.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        );
    };

    //now will do return statement, using condt'l rendering below
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }
    return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
            <FlatList 
                data={campsitesArray.filter((campsite) =>
                    favorites.includes(campsite.id))}
                //remember, the favorites array is an array of id's!!
                //above need to check to see if ID matches the id's listed under favorites array
                //then the filter method will return a NEW ARRAY of campsite ID's that match favorites

                //then give FlatList a renderItem prop
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Animatable.View>
    );

};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width:100
    }
});

///once done, updaate MainComponent and then test it

export default FavoritesScreen;