import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Picker,
} from "react-native";

type Props = {
    handleSubmitData: Function
}

const separatorStyle = StyleSheet.create({ 
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });

const Separator = () => (
    <View style={separatorStyle.separator} />
  );

const SignUpForm = ({handleSubmitData}: Props) => {
  const sendData = () => {
      const data = {
          cpf: parseInt(cpf),
          senha: senha,
          nomeCompleto: nome,
          nomeCompletoPai: nomePai,
          nomeCompletoMae: nomeMae,
          numeroRg: rg,
          dataDeNascumento: aniversario,
          localDeNascimento: localNasc,
          estadoCivil: estadoCivil,
          numeroDeFilhos: nFilhos,
          telefoneDeContato: telefone,
          email:email,
          endereco: endereco,
          escolaridade: escolaridade,
          objetivoProfissional: objetivoProf,
          resumoProfissional: resumoProf
      }
      handleSubmitData(data);
  }


  const [page, setPage] = useState(true);  

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [rg, setRg] = useState("");
  const [aniversario, setAniversario] = useState("");
  const [localNasc, setLocalNasc] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("Selecione...");
  const [nFilhos, setNFilhos] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [escolaridade, setEscolaridade] = useState("Selecione...");
  const [objetivoProf, setObjetivoProf] = useState("");
  const [resumoProf, setResumoProf] = useState("");

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      margin: 10,
      marginHorizontal: 16,
    },
    input: {
      marginBottom: 10,
      height: 25,
      borderColor: "gray",
      borderWidth: 1,
      height: 35,
      width: "100%",
      maxWidth:"95%",
      textAlign:"left"
    },
    formText: {
      fontSize: 30,
      color: "#DF0B0B",
      fontStyle: "normal",
      lineHeight: 29,
      marginBottom: 20,
      letterSpacing: 0.08,
    },
    picker: {
        width:"100%"
    },
    button:{
        paddingBottom:20
    },
    professionalInput: {
        marginBottom: 10,
      borderColor: "gray",
      borderWidth: 1,
      width: "100%",
      overflow: "scroll",
      textAlignVertical:"top"
    }
  });

  return (
    <View style={styles.view}>
        {page ? 
       <View> 
      <Text style={styles.formText}>Formulário de registro</Text>
      <TextInput
        placeholder="Digite seu CPF"
        placeholderTextColor="#202020"
        onChangeText={(text) => setCpf(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite seu RG"
        placeholderTextColor="#202020"
        onChangeText={(text) => setRg(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite seu email"
        placeholderTextColor="#202020"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor="#202020"
        secureTextEntry
        onChangeText={(text) => setSenha(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor="#202020"
        onChangeText={(text) => setNome(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite o nome do Pai"
        placeholderTextColor="#202020"
        onChangeText={(text) => setNomePai(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite o nome da Mãe"
        placeholderTextColor="#202020"
        onChangeText={(text) => setNomeMae(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite sua data de nascimento"
        placeholderTextColor="#202020"
        onChangeText={(text) => setAniversario(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite o local de seu nascimento"
        placeholderTextColor="#202020"
        onChangeText={(text) => setLocalNasc(text)}
        style={styles.input}
      />
      <Text>Selecione o estado civil:</Text>
      <Picker
        selectedValue={estadoCivil}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setEstadoCivil(itemValue)}
      >
        <Picker.Item label="Solteiro(a)" value="solteiro" />
        <Picker.Item label="Casado(a)" value="casado" />
        <Picker.Item label="Divorciado(a)" value="divorciado" />
        <Picker.Item label="Viúvo(a)" value="viuvo" />
        <Picker.Item label="Separado(a)" value="separado" />
      </Picker>

      <Button title="Prosseguir" onPress={() => setPage(!page)} style={styles.button} color="#DF0B0B"/>
      </View>
        : 
      <View>
           <Text style={styles.formText}>Formulário de registro</Text>
      <TextInput
        placeholder="Digite o número de filhos"
        placeholderTextColor="#202020"
        onChangeText={(text) => setNFilhos(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Digite o número de telefone"
        placeholderTextColor="#202020"
        onChangeText={(text) => setTelefone(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Insira o endereço"
        placeholderTextColor="#202020"
        onChangeText={(text) => setEndereco(text)}
        style={styles.input}
      />
      <Text>Selecione sua escolaridade:</Text>
      <Picker
        selectedValue={escolaridade}
        style={{ height: 50, width: "100%" }}
        onValueChange={(itemValue) => setEscolaridade(itemValue)}
      >
        <Picker.Item
          label="Ensino fundamental incompleto"
          value="ensino_fundamental_incompleto"
        />
        <Picker.Item
          label="Ensino fundamental completo"
          value="ensino_fundamental_completo"
        />
        <Picker.Item
          label="Ensino medio incompleto"
          value="ensino_medio_incompleto"
        />
        <Picker.Item
          label="Ensino medio completo"
          value="ensino_medio_completo"
        />
        <Picker.Item
          label="Ensino superior incompleto"
          value="ensino_superior_incompleto"
        />
        <Picker.Item
          label="Ensino superior completo"
          value="ensino_superior_completo"
        />
      </Picker>

      <TextInput
        placeholder="Escreva o seu objetivo profissional"
        placeholderTextColor="#202020"
        onChangeText={(text) => setObjetivoProf(text)}
        style={styles.professionalInput}
      />
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Escreva o seu resumo profissional"
        placeholderTextColor="#202020"
        onChangeText={(text) => setResumoProf(text)}
        style={styles.professionalInput}
      />
      <View>
      <Button title="Cadastrar" onPress={() => sendData()} style={styles.button} color="#DF0B0B"/>
      <Separator />
      <Button title="Voltar" onPress={() => setPage(!page)} style={styles.button} color="#DF0B0B"/>
      </View>
      </View>  
        }
    </View>
  );
};

export default SignUpForm;
