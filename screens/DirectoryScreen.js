// import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
// import { Avatar, ListItem } from 'react-native-elements';
import { Tile } from 'react-native-elements';
// import { CAMPSITES } from '../shared/campsites';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable';

const DirectoryScreen = ({ navigation }) => {
    // const [ campsites, setCampsites ] = useState(CAMPSITES);
    const campsites = useSelector((state) => state.campsites);

    if (campsites.isLoading) {
        return <Loading />
    }
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        );
    }
    
    const renderDirectoryItem = ({ item: campsite }) => {
        //renamed item to campsite in the destructuring of item to use it here
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                {/* // <ListItem onPress={() => props.onPress(campsite.id)}>
                // <ListItem  */}
                <Tile
                    title={campsite.name}
                    caption={campsite.description}
                    featured
                    //the above makes it so the name appears on the tile
                    onPress={() => navigation.navigate('CampsiteInfo', { campsite })}
                    imageSrc={{ uri: baseUrl + campsite.image }}
                />
                    {/* /* /* <Avatar source={campsite.image} rounded />
                    <ListItem.Content>
                        <ListItem.Title>{campsite.name}</ListItem.Title>
                        <ListItem.Subtitle>
                            {campsite.description}
                        </ListItem.Subtitle>
                    </ListItem.Content> */
                /* </ListItem> */  }
            </Animatable.View>
        );
    };
    return (
        <FlatList
            // data={props.campsites}
                //above is passing it an array from props.campsites

            // data={campsites}
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            //received fro above fx
            keyExtractor={(item) => item.id.toString()}
            //will return a unique value that the Flatlist will use to create a key
        />
    );
};

export default DirectoryScreen;



// import { useState } from 'react';
// import { FlatList } from 'react-native';
// import { Avatar, ListItem } from 'react-native-elements';
// import { CAMPSITES } from '../shared/campsites';

// const DirectoryScreen = ({ navigation }) => {
//     const [campsites, setCampsites] = useState(CAMPSITES);

//     const renderDirectoryItem = ({ item: campsite }) => {
//         return (
//             <ListItem
//                 onPress={() =>
//                     navigation.navigate('CampsiteInfo', { campsite })
//                 }
//             >
//                 <Avatar source={campsite.image} rounded />
//                 <ListItem.Content>
//                     <ListItem.Title>{campsite.name}</ListItem.Title>
//                     <ListItem.Subtitle>
//                         {campsite.description}
//                     </ListItem.Subtitle>
//                 </ListItem.Content>
//             </ListItem>
//         );
//     };
//     return (
//         <FlatList
//             data={campsites}
//             renderItem={renderDirectoryItem}
//             keyExtractor={(item) => item.id.toString()}
//         />
//     );
// };

// export default DirectoryScreen;



// import { FlatList } from 'react-native';
// import { Avatar, ListItem } from 'react-native-elements';

// const DirectoryScreen = (props) => {
//     const renderDirectoryItem = ({ item: campsite }) => {
//         return (
//             <ListItem onPress={() => props.onPress(campsite.id)}>
//                 <Avatar source={campsite.image} rounded />
//                 <ListItem.Content>
//                     <ListItem.Title>{campsite.name}</ListItem.Title>
//                     <ListItem.Subtitle>
//                         {campsite.description}
//                     </ListItem.Subtitle>
//                 </ListItem.Content>
//             </ListItem>
//         );
//     };
//     //change name of item to campsite

//     return (
//         <FlatList
//             data={props.campsites}
//             //the data prop must be in a form of an array that the Flatlist will use to render itesm from
//             renderItem={renderDirectoryItem}
//             keyExtractor={(item) => item.id.toString()}
//         />
//     );
// };

// export default DirectoryScreen;