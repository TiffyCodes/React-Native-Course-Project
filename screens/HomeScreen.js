//no longer need local state as below
// import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
//below is no longer needed bc getting data from Redux store
// import { CAMPSITES } from '../shared/campsites';
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const FeaturedItem = ({item}) => {
    // use conditional rendering to make sure item is defined so no Errors
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                {/* <Card.Image source={item.image}> */}
                <Card.Image source={{uri:baseUrl + item.image}}>
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
    
    // const [ campsites, setCampsites] = useState(CAMPSITES);
    // const [ promotions, setPromotions] = useState(PROMOTIONS);
    // const [ partners, setPartners] = useState(PARTNERS);
    //instead want to add variables to load info from redux

    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find(
        (item) => item.featured
    );
    const featPartner = partners.partnersArray.find((item) => item.featured);

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