import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Image, ScrollView, SafeAreaView } from "react-native";
import mockProfilePic from '../../assets/mockProfilePicture.jpg';
import Constants from 'expo-constants';
const separatorStyle= (separatorMb) => StyleSheet.create({ 
    separator: {
      marginVertical: 8,
      bottom: separatorMb,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });
  type Props = {
      separatorMb: Number
  }

const Separator = ({ separatorMb }: Props) => (
    <View style={separatorStyle(separatorMb).separator}/>
  );


const UserProfileBadge = () => {
    const styles = StyleSheet.create({ 
        view: {
            marginHorizontal:15,
        }, 
        profileImage: {
            width: 120,
            height: 120,
            borderRadius: 100,
            
        },
        userBadge: {
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 10
        },
        profileText: {
            flexDirection: "column",
        },
        name: {
            margin: 8,
           fontSize: 16,
            fontStyle: "normal",
            letterSpacing:0.02,
            textDecorationLine: "underline"

        },
        email: {
            margin: 8,
            marginHorizontal: 20,
            fontSize: 16,
            fontStyle: "normal",
            letterSpacing:0.02,
            textDecorationLine: "underline"
        },
        telefone: {
            margin: 8,
            marginHorizontal: 10,
            fontSize: 16,
            fontStyle: "normal",
            letterSpacing:0.02,
            textDecorationLine: "underline"
        },
        dados: {
            textTransform: "uppercase",
            bottom: 190,
        },
        dadosDeUsuario: {
            bottom: 190,
            fontStyle: "normal",
            letterSpacing:0.02,
        },
        cpfView: {
            flexDirection: "row",
            margin: 5
        },
        cpfText: {
            
            fontSize: 16
        },
        cpf: {
            fontSize: 16,
            textDecorationLine:"underline",
            marginHorizontal: 5
        },
        rgView: {
            flexDirection: "row",
            margin: 5
        },
        rgText: {
            
            fontSize: 16
        },
        rg: {
            fontSize: 16,
            textDecorationLine:"underline",
            marginHorizontal: 5
        },
        anvView: {
            flexDirection: "row",
            margin: 5
        },
        anvText: {
            
            fontSize: 16
        },
        anv: {
            fontSize: 16,
            textDecorationLine:"underline",
            marginHorizontal: 2
        },
        dadosFamiliares: {
            textTransform: "uppercase",
            bottom: 190,   
        },
        dadosFamiliaresSepator: {
            top:100
        },
        dadosDeUsuarioView: {
            textTransform: "uppercase",
            bottom: 170,
        },
        dadosExperiencia: {
            textTransform: "uppercase",
            bottom: 170,
        },
        experienciaView: {
            bottom: 155
        },
        resumoProf: {
            fontSize: 16,
        },
        dadosObjetivo: {
            textTransform: "uppercase",
            bottom: 160
        },
        container: {
            flex: 1,
          },
          dadosView: {
              bottom: -210
          },
          objetivoView: {
            bottom: 155,
            paddingBottom: 70
            
          }
    })

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.view} >
        <View style={styles.userBadge}>
        <Image style={styles.profileImage} source={mockProfilePic} /> 
        <View style={styles.profileText}> 
        <Text style={styles.name} >João Das Neves</Text> 
        <Text style={styles.email}>joaodasNeves@gmail.com</Text> 
        <Text style={styles.telefone}>31 9 3123-3215</Text> 
        </View>
        </View>
        <View style={styles.dadosView}>
        <Text style={styles.dados}>Dados de usuário</Text> 
        <Separator separatorMb={190} />
        <View style={styles.dadosDeUsuario}>
        <View style={styles.cpfView}>
        <Text style={styles.cpfText}>CPF:</Text>
        <Text style={styles.cpf} >131.131.042-32</Text> 
        </View>
        <View style={styles.rgView}>
        <Text style={styles.rgText}>RG:</Text> 
        <Text style={styles.rg}>MG-32.423.23</Text> 
        </View>
        <View style={styles.anvView}>
        <Text style={styles.anvText}>Aniversário: </Text>
        <Text style={styles.anv}>25 de Janeiro de 2000</Text> 
        </View>
        </View>
        <Separator separatorMb={150}/>
        <Text style={styles.dadosFamiliares}>Dados de familiáres</Text> 
        <View style={styles.dadosDeUsuarioView}>
        <View style={styles.cpfView}>
        <Text style={styles.cpfText}>Nome do pai:</Text>
        <Text style={styles.cpf} >Jose Luiz</Text> 
        </View>
        <View style={styles.rgView}>
        <Text style={styles.rgText}>Nome da mãe:</Text> 
        <Text style={styles.rg}>Ana Paula</Text> 
        </View>
        <View style={styles.anvView}>
        <Text style={styles.anvText}>Local de nascimento: </Text>
        <Text style={styles.anv}>Belo Horizonte</Text> 
        </View>
        </View>
        <Separator separatorMb={135}/>
        <Text style={styles.dadosExperiencia}>Resumo Profissional</Text> 
        <View style={styles.experienciaView}>
        <View style={styles.cpfView}>
        <Text style={styles.resumoProf} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text> 
        </View>
        </View>
        <Separator separatorMb={125}/>
        <Text style={styles.dadosObjetivo}>Objetivo Profissional</Text> 
        <View style={styles.objetivoView}>
        <View style={styles.cpfView}>
        <Text style={styles.resumoProf} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text> 
        </View>
        </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    )
}

export default UserProfileBadge;