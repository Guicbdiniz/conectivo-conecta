import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";
import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";

export default function App() {
  const { login } = useSelector((state) => state.userInformationReducer);
  return (
    <View style={styles.container}>
      {login ? <LoginPage /> : <SignUpPage /> }
      
    </View>
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
