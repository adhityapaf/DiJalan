import React, { Component, Fragment, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Alert,
  ActivityIndicator,
  ToastAndroid,
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
import ImagePicker, { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import ImagePickerCrop from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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
      uploading: false,
      transferred: 0,
      caption: '',
      modalVisible: false,
      image: '',
      userName: '',
      userLat: '',
      userLong: '',
      header: '',
      userImage: ''
    };
  }

  setHeader = (text) => {
    this.setState({ header: text });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  handleCaption = (text) => {
    this.setState({ caption: text });
  };

  handleImage = (text) => {
    this.setState({ image: text });
  };

  setUploading = (text) => {
    this.setState({ uploading: text });
  };

  setTransferred = (number) => {
    this.setState({ transferred: number });
  };

  setUserName = (text) => {
    this.setState({ userName: text });
  };
  setUserLat = (text) => {
    this.setState({ userLat: text });
  };
  setUserLong = (text) => {
    this.setState({ userLong: text });
  };
  setUserImage = (text) => {
    this.setState({ userImage: text });
  };

  takePhotoFromCamera = () => {
    ImagePickerCrop.openCamera({
      width: 422,
      height: 202,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      this.handleImage(image.path);
      this.setModalVisible(false);
    });
  };

  choosePhotoFromLibrary = () => {
    ImagePickerCrop.openPicker({
      width: 422,
      height: 202,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      this.handleImage(image.path);
      this.setModalVisible(false);
    });
  };

  renderImage() {
    if (!this.state.image) {
      return (
        <Image
          source={require('../assets/placeholder-image.png')}
          style={{ height: 202, width: 422, alignSelf: 'stretch' }}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: this.state.image }}
          style={{ height: 202, alignSelf: 'stretch' }}
        />
      );
    }
  }
  findCoordinates = () => {
    navigator.geolocation = require('@react-native-community/geolocation');
    navigator.geolocation.getCurrentPosition(
      (geo_success) => {
        // setLocation(geo_success);
        console.log(geo_success.coords.latitude);
        console.log(geo_success.coords.longitude);
        this.setUserLat(geo_success.coords.latitude);
        this.setUserLong(geo_success.coords.longitude);
      },
      (error) => Alert.alert(error.message),
    );
  };
  submitAction = async () => {
    const { navigation } = this.props;
    const { route } = this.props;
    const { title } = route.params;
    let jenisLaporan = JSON.stringify(title);
    let laporan = jenisLaporan.replace('"', '').replace('"', '');
    console.log("Jenis laporan : " + laporan);
    this.findCoordinates();

    const getCurrentDate = () => {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      return date + '/' + month + '/' + year; //format: dd/mm/yyyy;
    };

    if (!this.state.caption || !this.state.image) {
      Alert.alert('Ups', 'Gambar atau Caption belum terisi');
    } else {
      ToastAndroid.show('Mengunggah laporan..', ToastAndroid.SHORT);
      await database()
        .ref('/users/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          console.log('User data: ', snapshot.val());
          this.setUserName(snapshot.child('name').val());
          this.setUserImage(snapshot.child('userImage').val());
        });
      const uploadUri = this.state.image;
      console.log(uploadUri);
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      // nambahin timestamp ke nama file
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      this.setUploading(true);
      this.setTransferred(0);
      const ref = storage().ref('posts/' + filename);
      const task = ref.putFile(uploadUri);
      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
        this.setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
        );
      });
      try {
        await task;
        const urlImage = await ref.getDownloadURL();
        if (laporan == "Lapor Jalan Rusak") {
          const reference = await database().ref('/posts/').push();
          console.log('Child Key ' + reference.key);
          await reference
            .set({
              postOwner: {
                userName: this.state.userName,
                userImage: this.state.userImage,
                userID: auth().currentUser.uid,
              },
              postImage: urlImage,
              postCaption: this.state.caption,
              postDate: getCurrentDate(),
              postAddress: '',
              postLike: 0,
              postLat: this.state.userLat,
              postLong: this.state.userLong,
            })
            .then(() => console.log('Post Data set.'));
        } else if (laporan == "Lapor Kecelakaan") {
          const reference = await database().ref('/posts_kecelakaan/').push();
          console.log('Child Key ' + reference.key);
          await reference
            .set({
              postOwner: this.state.userName,
              postImage: urlImage,
              postCaption: this.state.caption,
              postDate: getCurrentDate(),
              postAddress: '',
              postLike: 0,
              postLat: this.state.userLat,
              postLong: this.state.userLong
            })
            .then(() => console.log('Post Data set.'));
        }
        this.setUploading(false);
        Alert.alert(
          'Gambar Berhasil di Upload!',
          'Gambar sudah berada di cloud~',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }],
          { cancelable: false },
        );
      } catch (error) {
        console.log(error);
      }
      this.handleCaption(null);
      this.handleImage(null);
    }
  };

  render() {
    const { modalVisible } = this.state;
    const { uploading } = this.state;

    return (
      <PaperProvider theme={theme}>
        <View>
          {this.renderImage()}
          <View style={{ padding: 20 }}>
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
              value={this.caption}
              textAlignVertical="top"
              onChangeText={this.handleCaption}
            />
            {uploading ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.transferred} % Completed!</Text>
                <ActivityIndicator size="large" color="#0984E3" />
              </View>
            ) : (
                <TouchableRipple
                  onPress={() => this.submitAction()}
                  style={styles.button}
                  rippleColor="rgba(0, 0, 0, .32)">
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableRipple>
              )}
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => this.setModalVisible(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity onPress={() => this.takePhotoFromCamera()}>
                  <Text style={styles.modalText}>Kamera</Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 233,
                    border: 1,
                    backgroundColor: '#000',
                    height: 1,
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                />
                <TouchableOpacity onPress={() => this.choosePhotoFromLibrary()}>
                  <Text style={styles.modalText}>Galeri</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </PaperProvider>
    );
  }
}

export default LaporActivity;
