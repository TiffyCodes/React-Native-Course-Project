import { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites'

const DirectoryScreen = ({ navigation }) => {
    const [ campsites, setCampsites ] = useState(CAMPSITES);

    const renderDirectoryItem = ({ item: campsite }) => {
        //renamed item to campsite in the destructuring of item to use it here
        return (
            // <ListItem onPress={() => props.onPress(campsite.id)}>
            <ListItem onPress={() => navigation.navigate('CampsiteInfo', { campsite })}>
                {/* above sets the campsite param via the navigation's prop's navigate() fx */}
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };
    return (
        <FlatList
            // data={props.campsites}
                //above is passing it an array from props.campsites

            data={campsites}
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