import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";
import 'react-native-gesture-handler';
import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  { UserProfileBadge }  from "./src/components/UserProfileBadge";

const Stack = createStackNavigator();

export default function App() {
  const { login } = useSelector((state) => state.userInformationReducer);
  return (
    // <NavigationContainer>
    //  <Stack.Navigator>
    // <Stack.Screen
    //      name="Meu Perfil"
    //      component={UserProfileBadge} />
    //      </Stack.Navigator>
    // </NavigationContainer>
     <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
          options={{
           title: 'Login',
           headerStyle: {
             backgroundColor: '#DF0B0B',
           },
           headerTintColor: '#fff',
           headerTitleStyle: {
             textAlign: 'center', 
             fontWeight: 'bold',
           },
         }}
         name="Login"
         component={LoginPage} />
         <Stack.Screen
         name="SignUp"
         component={SignUpPage} />
          <Stack.Screen
         name="Meu Perfil"
         options={{
          headerStyle: {
            backgroundColor: '#DF0B0B',
          },
          headerTintColor: '#fff',
        }}
         component={UserProfileBadge} />
         </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
