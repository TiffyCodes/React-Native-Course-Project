import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
// import { COMMENTS } from '../shared/comments';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input } from 'react-native-elements';
import { postComment } from '../features/commentsSlice';
import * as Animatable from 'react-native-animatable';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments= useSelector((state) => state.comments);

    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    //removiing local state variable for comments, and leaving it for favorite
    // const [comments, setComments ] = useState(COMMENTS);
    // const [favorite, setFavorite] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [ rating, setRating] = useState(5);
    const [ author, setAuthor] = useState('');
    const [ text, setText] = useState('');

    const handleSubmit= () => {
        const newComment= {
            rating,
            author,
            text,
            campsiteId: campsite.id
        };

        // console.log('New comment: ', newComment);
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
            setRating(5),
            setAuthor(''),
            setText('')
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14}}>{item.text}</Text>
                <Rating 
                    style={{ alignItems: 'flex-start', paddingVertical:'5%', fontSize: 12}}
                    startingValue={item.rating} 
                    imageSize={10}
                    readonly 
                />
                <Text style={{ fontSize: 12}}>
                    {`--${item.author}, ${item.date}`}
                </Text>

            </View>
        );
    };

    // return <RenderCampsite campsite={campsite} />;
    return (
        // <>
        <Animatable.View
            animation='fadeInUp' 
            duration={2000} 
            delay={1000}
        >

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
                        onShowModal={() => setShowModal(!showModal)}
                        />
                        
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />

            {/* modal to follow */}
                <Modal 
                    animationType='slide'
                    //can have a slide animation or fade animation or none
                    transparent={false}
                    //above makes opaque versus transparent
                    visible={showModal}
                    //so of showModal true, will show, if false, will not
                    onRequestClose={() => setShowModal(!showModal)}
                >
                        <View style={styles.modal}>
                            
                            <Rating
                                showRating
                                startingValue={rating}
                                // imageSize='40'  ** apparently it should be like below
                                imageSize={40} 
                                onFinishRating={(rating)=> setRating(rating)}
                                style={{paddingVertical: 10}}
                            />
                            <Input 
                                placeholder='Author'
                                // leftIcon='user-o'  *** you did this wrong, so study
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                leftIconContainerStyle={{paddingRight:10}}
                                // onChangeText={() => setText(text)}  ** wrong
                                onChangeText={(author) => setAuthor(author)}
                                value={author}
                            />
                            <Input 
                                placeholder='Comment'
                                // leftIcon='comment-o'  ** wrong**
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                leftIconContainerStyle={{paddingRight:10}}
                                onChangeText={(text) => setText(text)}
                                value={text}
                            />
                            <View style={{margin: 10}}>
                                <Button 
                                    title='Submit'
                                    color='#5637DD'
                                    onPress={() => {
                                        handleSubmit();
                                        resetForm();
                                    }}
                                />
                            </View>



                            <View style={{margin: 10}}>
                                <Button 
                                onPress={() => {
                                    setShowModal(!showModal);
                                    resetForm();
                                    }} 
                                    // style={{color: '#808080'}}   **wrong
                                    color= '#808080'
                                    title='Cancel' />
                            </View>
                        </View>
                </Modal>
        
        {/* </> */}
        </Animatable.View>
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
    modal: {
        justifyContent: 'center',
        margin: 20
    },
});

export default CampsiteInfoScreen;