//adding PanResponder and Alert for the response to the slide towards the right and the alert to see if you want to add the campsite as a favorite
import { Text, View, StyleSheet, PanResponder, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const RenderCampsite = (props) => {
    const { campsite } = props;

    const isLeftSwipe = ({ dx }) => dx < -200;
    //for the isLeftSwipe fx's parameter, it will take an object and destructure from it dx is like delta x or the distance of a gesture across the x axis
    //so we will recognize a gesture where there is a horiz drag to the left that is smaller than -200px; so -300 would be smaller and -100 bigger 

    //create a pan responder and keep it in a constant name, here we name it the same:: under the Animatable View you will connect it to the component
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderEnd: (e, gestureState) => {
        //above is an event handler; the evenet we don't need as much so just putting because need it to be able to get to the 2nd parameter- gesture state
            console.log('pan responder end', gestureState);
            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.isFavorite
                            ? console.log('Already set as a favorite.')
                            : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
        }
    });
    

    //below is conditional rendering
    if (campsite) {
        return (
        <Animatable.View
            animation = 'fadeInDownBig'
            duration={2000}
            delay={1000}
            //below we are connecting the PanResponder to a component
            {...panResponder.panHandlers}
            // above spreads the panResponders pan handlers to recombine as 1 obj to pass in as props to this component
        >
            <Card containerStyle={styles.cardContainer}>
                {/* <Card.Image source= {campsite.image}> */}
                <Card.Image source={{ uri: baseUrl + campsite.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={styles.cardText}
                        >
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{campsite.description}</Text>
                <View></View>
                <View style={styles.cardRow}>
                    <Icon
                        name={props.isFavorite ? 'heart' : 'heart-o'}
                        //added JS above to say if is favorite, show heart icon and if not, show heart-o
                        type='font-awesome'
                        color='#f50'
                        raised
                        // will add a shadow 
                        reverse
                        //reverse will reverse the color scheme
                        onPress={() =>
                            props.isFavorite ? console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    
                        <Icon
                            name='pencil'
                            //added JS above to say if is favorite, show heart icon and if not, show heart-o
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            // will add a shadow 
                            reverse
                            //reverse will reverse the color scheme
                            onPress={() => props.onShowModal()}
                        />
                </View>
            </Card>
        </Animatable.View>
        );
    }
    //if false (conditional rendering for if no campsite) must return something (just view)
    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20,
    },
    cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
    },
    cardText: {
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 20
    },
});

export default RenderCampsite;