import { configureStore } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
//importing the persistStore so can save some things (ex. Favorites) on client side storage (so accessible offline!! and on the emulator you can close it and open and the favorites are still there) and can also use other storage
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';




//****** added "const config" with presist */
const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}
export const store = configureStore({
    reducer: persistCombineReducers(config, {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});
export const persistor = persistStore(store);

//**** replaced below with above with Persist */
// export const store = configureStore({
//     reducer: {
//         campsites: campsitesReducer,
//         comments: commentsReducer,
//         partners: partnersReducer,
//         promotions: promotionsReducer,
//         favorites: favoritesReducer
//     }
// });