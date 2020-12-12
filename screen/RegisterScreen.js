import React, {Component} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  TouchableRipple,
} from 'react-native-paper';
import styles from '../app.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984E3',
    accent: '#0984E3',
  },
};

class RegisterActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hiddenState: true,
      namaLengkap: '',
      noHp: '',
    };
  }

  setHiddenState = (visible) => {
    this.setState({hiddenState: visible});
  }

  handleEmail = (text) => {
    this.setState({email: text});
  }

  handlePassword = (text) => {
    this.setState({password : text});
  }

  handleNama = (text) => {
    this.setState({namaLengkap : text});
  }

  handleNoHp = (text) => {
    this.setState({noHp : text});
  }

  createUser = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  logOff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  render() {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.welcome_container}>
          <ImageBackground
            source={require('../assets/background_welcome.png')}
            style={{
              resizeMode: 'center',
              flex: 1,
            }}>
            <View style={{padding: 40}}>
              <Image
                style={styles.img_register}
                source={require('../assets/logo.png')}
              />
              <View>
                <TextInput
                  style={styles.register_textField}
                  label="Nama Lengkap"
                  mode="outlined"
                  keyboardType="default"
                  selectionColor="#0984E3"
                  value={this.namaLengkap}
                  onChangeText={this.handleNama}
                />
                <TextInput
                  style={styles.register_textField}
                  label="Email"
                  mode="outlined"
                  keyboardType="email-address"
                  selectionColor="#0984E3"
                  value={this.email}
                  onChangeText={this.handleEmail}
                />
                <TextInput
                  style={styles.register_textField}
                  label="Password"
                  autoCompleteType="password"
                  mode="outlined"
                  secureTextEntry={true}
                  value={this.password}
                  onChangeText={this.handlePassword}
                  right={
                    <TextInput.Icon
                      name='eye-off'
                      size={24}
                      onPress={console.log('eye clicked')}
                    />
                  }
                />
                <TextInput
                  style={styles.register_textField}
                  label="Nomer Handphone"
                  mode="outlined"
                  keyboardType="number-pad"
                  selectionColor="#0984E3"
                  value={this.noHp}
                  onChangeText={this.handleNoHp}
                />
                <TouchableRipple
                  onPress={() => {this.props.navigation.navigate('Home')}}
                  style={styles.button}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={styles.buttonText}>REGISTRASI</Text>
                </TouchableRipple>
                <Text style={{alignSelf: 'center', marginTop: 10}}>
                  Sudah Punya Akun? Yuk
                </Text>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
                  <Text
                    style={{
                      color: '#0984E3',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </PaperProvider>
    );
  }
}

export default RegisterActivity;
