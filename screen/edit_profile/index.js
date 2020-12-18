import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePickerCrop from 'react-native-image-crop-picker';
import styles from '../../app.styles';





const EditProfile = () => {
  const [nama, setName] = useState('');
  const [noHandphone, setNoHandphone] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [image, setImage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePickerCrop.openCamera({
      width: 150,
      height: 150,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      setModal(false);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePickerCrop.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      setModal(false);
    });
  };

  const renderImage = () => {
    if (image == '') {
      return (
        <Image
          source={require('../../assets/image_female.png')}
          style={{width: 150, height: 150, borderRadius: 150 / 2}}
        />
      );
    } else {
      return (
          <Image
            source={{uri: image}}
            style={{width: 150, height: 150, borderRadius: 150 / 2}}
          />
        );
    }
  };

  const saveProfile = async() => {
      ToastAndroid.show('Menyimpan Profile..', ToastAndroid.SHORT);
      const uploadUri = image;
      console.log(uploadUri);
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      // nambahin timestamp ke nama file
      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');
      filename = name + Date.now() + '.' + extension;
      setUploading(true);
      setDisabled(true);
      setTransferred(0);
      const ref = storage().ref('userImage/'+filename);
      const task = ref.putFile(uploadUri);
      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });
      try {
          await task;
          const urlImage = await ref.getDownloadURL();
          const reference = await database().ref('/users/'+auth().currentUser.uid)
          .update({
              name: nama,
              userImage: urlImage,
              noHp: noHandphone,
              bio: bio
          }).then(() => console.log('User updated'))
          setUploading(false);
          setDisabled(false);
          Alert.alert('Update Profile', 'Profile berhasil di update!',
          [{text: 'OK', onPress: () => navigation.navigate('Home')}],
          {cancelable: false},
          );
      } catch (error) {
          console.log(error);
      }

  }

  useEffect(() => {
      ToastAndroid.show('Memuat data user..', ToastAndroid.SHORT, ToastAndroid.CENTER);
    const data = database()
      .ref('/users/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        console.log('Username : ', snapshot.child('name').val());
        setName(snapshot.child('name').val());
        setEmail(auth().currentUser.email);
        setImage(snapshot.child('userImage').val());
        setNoHandphone(snapshot.child('noHp').val());
        if (snapshot.child('bio').exists) {
          console.log('user bio : ' + snapshot.child('bio').val());
          if (snapshot.child('bio').val() == null) {
            setBio('');
          } else {
            setBio(snapshot.child('bio').val());
          }
        }
        setDisabled(false);
      });
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          padding: 16,
        }}>
        {renderImage()}
        <TouchableOpacity onPress={() => setModal(true)}>
          <Text
            style={{color: '#449AE9', marginTop: 8, fontFamily: 'monospace'}}>
            Change Profile Photo
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignSelf: 'stretch',
            marginTop: 16,
          }}>
          <TextInput
            label="Nama Lengkap"
            value={nama}
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={{marginTop: 8}}
            label="No Handphone"
            value={noHandphone}
            onChangeText={(noHandphone) => setNoHandphone(noHandphone)}
          />

          <TextInput
            style={{marginTop: 8}}
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <TextInput
            style={{marginTop: 8}}
            label="Bio"
            value={bio}
            onChangeText={(bio) => setBio(bio)}
          />
          <Button mode="contained" style={{marginTop: 8}} color="#0984E3" disabled={disabled} onPress={() => saveProfile()}>
            SAVE
          </Button>
          {uploading ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0984E3" />
            </View>
          ) : null}

          {/* <TextInput
            style={{marginTop: 24}}
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />

          <TextInput
            style={{marginTop: 8}}
            label="Retry Password"
            secureTextEntry={true}
            value={retryPassword}
            onChangeText={(retryPassword) => setRetryPassword(retryPassword)}
          />

          <Button mode="contained" style={{marginTop: 8}} color="#0984E3">
            SAVE
          </Button> */}

        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => takePhotoFromCamera()}>
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
              <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
                <Text style={styles.modalText}>Galeri</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
export default EditProfile;
