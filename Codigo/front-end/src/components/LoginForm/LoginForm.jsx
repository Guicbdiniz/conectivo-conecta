import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const LoginForm = () => {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
return (
<View>
<Text>Login</Text>
<TextInput placeholder="Email" onChangeText={text=> setEmail(text)}/>
<TextInput secureTextEntry placeholder="Senha" onChangeText={text=> setPassword(text)}/>
</View>
);
};

export default LoginForm;