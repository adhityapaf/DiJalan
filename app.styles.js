import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';

const styles = StyleSheet.create({
  welcome_container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F9FD',
  },
  img_register: {
    marginTop: 12,
    marginBottom: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 295,
    height: 114,
  },
  img_login: {
    marginTop: 80,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 295,
    height: 114,
  },
  register_textField: {
    height: 46,
    marginTop: 16,
    borderColor: '#0984E3',
  },
  login_textField: {
    height: 71,
    marginTop: 16,
    borderColor: '#0984E3',
  },
  button: {
    marginTop: 20,
    width: 330,
    height: 60,
    borderRadius: 2,
    backgroundColor: '#0984E3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  captionTextArea: {
    textAlignVertical: 'top',
    marginTop: 20,
  },
});
export default styles;
