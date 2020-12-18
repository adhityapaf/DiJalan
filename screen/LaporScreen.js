import React, {Component, Fragment} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Alert,
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
import ImagePicker, {launchCamera} from 'react-native-image-picker';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984E3',
    accent: '#0984E3',
  },
};

class LaporActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      caption: '',
      modalVisible: false
    };
  }
  
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  handleCaption = (text) => {
    this.setState({ caption: text })
  };

  chooseImage = () => {
    let options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', reponse.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  }
    launchCamera = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.uri};
          // console.log('response', JSON.stringify(response));
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri,
          });
        }
      });
    };
    launchImageLibrary = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          // console.log('response', JSON.stringify(response));
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.uri
          });
        }
      });
  
    }
  
    // renderFileData() {
    //   if (this.state.fileData) {
    //     return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
    //       style={styles.images}
    //     />
    //   } else {
    //     return <Image source={require('./assets/dummy.png')}
    //       style={styles.images}
    //     />
    //   }
    // }
  
    renderFileUri() {
      if (this.state.fileUri) {
        return <Image
          source={{ uri: this.state.fileUri }}
          style={{height: 202, alignSelf: 'stretch'}}
        />
      } else {
        return <Image
          source={require('../assets/placeholder_jalanLubang.png')}
          style={{height: 202, alignSelf: 'stretch'}}
        />
      }
    }

    
    render(){
      const { modalVisible }= this.state;
      return(
<PaperProvider theme={theme}>
      <View>
        {this.renderFileUri()}
        <View style={{padding: 20}}>
          <TouchableRipple
            onPress={() => this.setModalVisible(true)}
            style={styles.button}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={styles.buttonText}>Pilih Foto</Text>
          </TouchableRipple>
          <TextInput
            style={styles.captionTextArea}
            label="Caption"
            mode="outlined"
            keyboardType="default"
            numberOfLines={5}
            multiline={true}
            selectionColor="#0984E3"
            value={this.email}
            textAlignVertical="top"
            onChangeText={this.handleCaption}
          />
          <TouchableRipple
            onPress={() => console.log('Submit clicked!')}
            style={styles.button}
            rippleColor="rgba(0, 0, 0, .32)">
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableRipple>
        </View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}> 
              <TouchableOpacity onPress={() => this.launchCamera()}>
                <Text style={styles.modalText}>Kamera</Text>
              </TouchableOpacity>
              <View style={{width: 233, border: 1, backgroundColor: "#000", height:1, marginTop: 8, marginBottom: 8}} />
              <TouchableOpacity onPress={() => this.launchImageLibrary()}>
                <Text style={styles.modalText}>Galeri</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
      )
    }
  };

export default LaporActivity;
