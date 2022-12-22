import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

// this screen does not have a state variable, so the only one thus far that does not have to be connected to Redux
const ContactScreen = () => {
    return (
        // <ScrollView>
        <Animatable.View animation ='fadeInDown' duration={2000} delay={1000}>

            <Card wrapperStyle={{margin: 20}} >
                <Card.Title>
                    Contact Information
                </Card.Title>
                <Card.Divider />
                <Text>1 Nucamp Way</Text>
                <Text>Seattle, WA 98001</Text>
                <Text style= {{marginBottom: 10 }} >U.S.A.</Text>
                <Text>Phone: 1-206-555-1234</Text>
                <Text>Email: campsites@nucamp.co</Text>
            </Card>

        {/* </ScrollView> */}
        </Animatable.View>
    )
};

export default ContactScreen;