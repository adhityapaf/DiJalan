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

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984E3',
    accent: '#0984E3',
  },
};

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

class LoginActivity extends Component {
  componentDidMount(){
    <LoginApp />
  }
}

function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hiddenPass, hiddenState] = React.useState(true);
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
              style={styles.img_login}
              source={require('../assets/logo.png')}
            />
            <View>
              <TextInput
                style={styles.login_textField}
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                selectionColor="#0984E3"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.login_textField}
                label="Password"
                autoCompleteType="password"
                mode="outlined"
                secureTextEntry={hiddenState ? true : false}
                value={password}
                onChangeText={(text) => setPassword(text)}
                right={
                  <TextInput.Icon
                    name={hiddenState ? 'eye-off' : 'eye'}
                    size={24}
                    onPress={() => hiddenState(!hiddenPass)}
                  />
                }
              />
              <TouchableRipple
                onPress={() => navigation.navigate('Home')}
                style={styles.button}
                rippleColor="rgba(0, 0, 0, .32)">
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableRipple>
              <Text style={{alignSelf: 'center', marginTop: 10}}>
                Belum Punya Akun? Yuk
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: '#0984E3',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Registrasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
}

export default LoginScreen;
