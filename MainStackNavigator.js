import React,{ Component} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import RouteMap from './components/RouteMap'
import BestRouteList from './components/BestRouteList'

const Stack = createStackNavigator()

function MainStackNavigator() {
  
  return (

    
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2C3335' } }} >
        
        <Stack.Screen name="LET'S GO PUNEKAR" component={Home}
          options={{
            
            headerTitleAlign:'center',
          headerTintColor:'white'
            
          }} />
          <Stack.Screen name='Best Routes' component={BestRouteList}
        options={{
          headerTitleAlign:'center',
          headerTintColor:'white'
          
        }}
        />
        <Stack.Screen name='RouteMap' component={RouteMap}
        options={{
          headerTitleAlign:'center',
          headerTintColor:'white'
          
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator











