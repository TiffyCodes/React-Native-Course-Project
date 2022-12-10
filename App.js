import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  // return <Main />;
  return (
    <NavigationContainer>
      {/* must wrap around all components that use navigation in our app (like Main where all our nav setup will reside)  */}
      <Main />
    </NavigationContainer>
  )
}





