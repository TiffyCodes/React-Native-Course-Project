//no longer need local state as below
// import { useState } from 'react';
//ANIMATION requires useEffect here and useRef:
import { useEffect, useRef} from 'react';
// import { ScrollView, Text, View } from 'react-native';
import { Text, View, Animated } from 'react-native';
//don't need ScrollView any more with Animation and, instead, replacing it with the below:

import { Card } from 'react-native-elements';
//below is no longer needed bc getting data from Redux store
// import { CAMPSITES } from '../shared/campsites';
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

//ANIMATION:  basic workflow- create an animated.value, then set up 1+ style atttribute(s) of an animated component, then drive updates via animaations using Animated.timing()
//components must be configured to use the animated library.   Some wrappers can ve Animated.Image or Animated.ScrollView
//Links: React Native Animations: https://reactnative.dev/docs/0.69/animations
//Links: React Native Animated: https://reactnative.dev/docs/0.69/animated


const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text> {props.errMess}</Text>
            </View>
        )
    }

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
    //ANIMATION requires below
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        //above is going from 0% to 100%, below is duration property making it 1500 mil. sec. 1.5 secs to change
        duration: 1500,
        useNativeDriver: true
        //above helps improve performance of animations in this library we are using
    });

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find(
        (item) => item.featured
    );
    const featPartner = partners.partnersArray.find((item) => item.featured);

        //ANIMATION to call it 1x, call the start inside a useEffect hook which gets a fx as first argument and dependency array (empty) as second- empty so when homescreen first mounts it autostarts
        useEffect(() => {
            scaleAnimation.start();
        }, []);
        
    return (
        // ANIMATION- remove reg ScrollView and replace with Animated.ScrollView
        <Animated.ScrollView style={{ transform: [{scale: scaleValue }] }}>
            {/* the type of transform is scale, and we set the value of the scale to scaleValue (dynamic value so will change) which we put above as 0->1 inside "const scaleAnimation" */}
        
        {/* <ScrollView> */}
        {/* scroll view loads all components at once versus FlatList which does lazy loading, so if long list use FlatList */}
        {/* <Text> Home Screen </Text> */}
        
        <FeaturedItem 
            item={featCampsite} 
            isLoading={campsites.isLoading}
            errMess={campsites.errMess}
        />
        <FeaturedItem 
            item={featPromotion} 
            isLoading={promotions.isLoading}
            errMess={promotions.errMess}
        />
        <FeaturedItem 
            item={featPartner} 
            isLoading={partners.isLoading}
            errMess={partners.errMess}
        />

        {/* </ScrollView> */}
    </Animated.ScrollView>
    );
};

export default HomeScreen;