import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

type Props = {
  handleFormSubmit: Function,
  handleSignUpClick: Function,
  navigation: Object
};

const LoginForm = ({ handleFormSubmit, handleSignUpClick, navigation }: Props) => {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState("");

  const styles = StyleSheet.create({
    cpfInput: {
        marginBottom: 10,
        height: 25, 
        borderColor: 'gray', 
        borderWidth: 1,
        height: 35
    },
    passwordInput: {
        marginBottom: 10,
        height: 25, 
        borderColor: 'gray', 
        borderWidth: 1,
        height: 35
    },
    button: {
        margin: "10px"
    },
    conectaText: {
        display: "flex",
        fontSize: 32,
        color: "#DF0B0B",
        fontStyle: "normal",
        lineHeight: 29,
        marginBottom: 10,
        textAlign: "center",
        letterSpacing:0.08
    },
    loginText: {
        display: "flex",
        fontSize: 28,
        color: "#DF0B0B",
        fontStyle: "normal",
        lineHeight: 29,
        marginBottom: 30,
        textAlign: "center",
        letterSpacing:0.02
    },
    view: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        marginHorizontal: 16,
    }, 
    link: {
        textDecorationLine: "underline", 
        textDecorationColor: "#DF0B0B",
        color: "#DF0B0B",
        textAlign: 'center',
        width: 'auto',
        marginTop:10
    }
  });

  const sendUser = () => {
    const data = {
      email,
      password,
    };
    handleFormSubmit(data);
  };
  return (
    <View style={styles.view}>
      <Text style={styles.conectaText}>Conecta</Text>
      <Text style={styles.loginText}>Login</Text>
      <TextInput placeholder="Digite seu email" onChangeText={(text) => setEmail(text)} style={styles.cpfInput} />
      <TextInput
        secureTextEntry
        placeholder="Digite sua senha"
        onChangeText={(text) => setPassword(text)}
        style={styles.passwordInput}
      />
      <Button title="Entrar" onPress={() => { sendUser(); navigation.navigate('Meu Perfil');}} style={styles.button} color="#DF0B0B" />
      <Text style={styles.link} onPress={() =>
            navigation.navigate('SignUp')
          }>Não tem uma conta ainda? Registre-se</Text>
    </View>
  );
};

export default LoginForm;
