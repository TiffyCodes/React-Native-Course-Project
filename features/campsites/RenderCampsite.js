import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const RenderCampsite = (props) => {
    const { campsite } = props;

    

    

    //below is conditional rendering
    if (campsite) {
        return (
        <Animatable.View
            animation = 'fadeInDownBig'
            duration={2000}
            delay={1000}
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