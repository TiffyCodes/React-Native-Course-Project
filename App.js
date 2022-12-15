import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  // return <Main />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* must wrap around all components that use navigation in our app (like Main where all our nav setup will reside)  */}
        <Main />
      </NavigationContainer>
    </Provider>  
  );
}





