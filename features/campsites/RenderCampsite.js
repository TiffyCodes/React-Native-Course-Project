import { Text, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const RenderCampsite = (props) => {
    const { campsite } = props;
    //below is conditional rendering
    if (campsite) {
        return (
            <Card containerStyle={styles.cardContainer}>
                <Card.Image source= {campsite.image}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }} 
                        >
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{campsite.description}</Text>
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
            </Card>
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
    }
});

export default RenderCampsite;