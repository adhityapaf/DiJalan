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
  fab: {
    backgroundColor: "#0984E3"
  },
  jenisLaporanContainer : {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    
  },
  jenisLaporanItems: {
    backgroundColor: "#0984E3",
    width: 137,
    height: 92,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  jenisLaporanIcon: {
    height: 30,
    width: 30
  },
  jenisLaporanLabel: {
    marginTop: 8,
    fontSize: 16,
    color: "#FFFFFF"
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center"
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: 280,
    height: 105,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    alignContent:"center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    fontSize: 20,
    textAlign: "center"
  }
});
export default styles;
