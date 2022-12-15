// import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
// import { COMMENTS } from '../shared/comments';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments= useSelector((state) => state.comments);

    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    //removiing local state variable for comments, and leaving it for favorite
    // const [comments, setComments ] = useState(COMMENTS);
    // const [favorite, setFavorite] = useState(false);

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14}}>{item.text}</Text>
                <Text style={{ fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12}}>
                    {`--${item.author}, ${item.date}`}
                </Text>

            </View>
        );
    };

    // return <RenderCampsite campsite={campsite} />;
    return (
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                {/* do it inside a react fragment so still only one passing in a single parent component  */}
                    <RenderCampsite 
                    campsite={campsite} 
                    isFavorite={favorites.includes(campsite.id)}
                    // markFavorite={() => setFavorite(true)}
                    markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                    />
                    
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },

    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
});

export default CampsiteInfoScreen;