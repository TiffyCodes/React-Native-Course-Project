import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

const FeaturedItem = ({item}) => {
    // use conditional rendering to make sure item is defined so no Errors
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={item.image}>
                    <View style = {{ justifyContent: 'center', flex: 1 }}>
                        <Text 
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    return <View />
};

const HomeScreen = () => {
    const [ campsites, setCampsites] = useState(CAMPSITES);
    const [ promotions, setPromotions] = useState(PROMOTIONS);
    const [ partners, setPartners] = useState(PARTNERS);

    const featCampsite = campsites.find((item) => item.featured);
    const featPromotion = promotions.find((item) => item.featured);
    const featPartner = partners.find((item) => item.featured);

    return (
    <ScrollView>
        {/* scroll view loads all components at once versus FlatList which does lazy loading, so if long list use FlatList */}
        {/* <Text> Home Screen </Text> */}
        <FeaturedItem item={featCampsite} />
        <FeaturedItem item={featPromotion} />
        <FeaturedItem item={featPartner} />

    </ScrollView>
    );
};

export default HomeScreen;