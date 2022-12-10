import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const RenderCampsite = ({ campsite }) => {
    //below is conditional rendering
    if (campsite) {
        return (
            <Card containerStyle={{ padding: 0 }}>
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
            </Card>
        );
    }
    //if false (conditional rendering for if no campsite) must return something (just view)
    return <View />;
};

export default RenderCampsite;