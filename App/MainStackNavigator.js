import React,{ Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import RouteMap from './components/RouteMap'
import BestRouteList from './components/BestRouteList'
import Info from './components/info'

const Stack = createStackNavigator()

function MainStackNavigator() {
  
  return (

    
    <NavigationContainer>
      
      <Stack.Navigator>
        
        <Stack.Screen name="LET'S GO PUNEKAR" component={Home}
          options={{
            
            headerTitleAlign:'center'
            
          }} />
          <Stack.Screen name='Best Routes' component={BestRouteList}
        options={{
          headerTitleAlign:'center'
          
        }}
        />
        <Stack.Screen name='RouteMap' component={RouteMap}
        options={{
          headerTitleAlign:'center',
          
        }}
        />
        <Stack.Screen name='Information' component={Info}
        options={{
          headerTitleAlign:'center',
          
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator











