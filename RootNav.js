import React from 'react';

import Camera from "./Camera"
import Image from "./ImageDetail"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class Rootnavbar extends React.Component {
    render(){
    return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen name="Camera" title="Home" component={Camera} />
        <Stack.Screen name="Image" title="Image Detail" component={Image} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}