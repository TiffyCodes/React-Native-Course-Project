import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// import { store } from './redux/store';
//the next 3 imported for persist in combo with what you did on store.js
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';

export default function App() {
  // return <Main />;
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
      {/* PersistGate component will help integrate it w/ React and REact Native apps, prevents from loading until the Redux store has been rehydrated fully from the client-side storage, whatever you pass is what it will show while loading- so we used our Loading component */}
        <NavigationContainer>
          {/* must wrap around all components that use navigation in our app (like Main where all our nav setup will reside)  */}
          <Main />
        </NavigationContainer>
        </PersistGate>
    </Provider>  
  );
}





