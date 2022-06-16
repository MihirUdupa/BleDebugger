import React from 'react';
import HomeScreen from './src/Home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from './src/Home/transaction';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connectivity" component={TransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
