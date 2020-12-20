import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext, useEffect } from 'react';

import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions,
  FlatList,
} from 'react-native';
import { Card, Button, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ReadMore from 'react-native-read-more-text';

const { width, height } = Dimensions.get('window');

const fetchUser = async () => {
  await database()
    .ref('/users/' + auth().currentUser.uid + '/name')
    .once('value')
    .then((snapshot) => {
      console.log('User data: ', snapshot.val());
      return snapshot.val();
    });
};

const postLike = ((id, like) => {
  let convertLike = like + 1;
  database()
    .ref('/posts/' + id)
    .update({
      postLike: convertLike,
    })
    .then(
      ToastAndroid.show('Berhasil Like', ToastAndroid.SHORT)
    );
})

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Post First',
    date: '12/12/2020',
    like: 50,
    comment: 10,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Post Second',
    date: '18/12/2020',
    like: 45,
    comment: 8,
  },
];

function AccountScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Loading Nama..');
  const [bio, setBio] = useState('Loading Bio...');
  const [userImage, setUserImage] = useState('');
  const { logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const PostItem = ({ item }) => {
    return (
      <Card style={styles.CardContainer}>
        {userImage == null || userImage == '' ?
          <Card.Title
            title={item.username}
            subtitle={item.address}
            left={props => <Avatar.Image {...props} source={require('../../assets/place-holder.png')} />}            
          />
          :
          <Card.Title
            title={item.username}
            subtitle={item.address}
            left={props => <Avatar.Image {...props} source={{ uri: userImage }} />}            
          />
        }
        <Card.Content>
          <ReadMore
            numberOfLines={2}>
              {item.caption}
          </ReadMore>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <View style={styles.CardAction}>
            <Text>{item.date}</Text>
            <Button icon="thumb-up">{item.like}</Button>
            <Button icon="comment">{item.comment}</Button>
          </View>
        </Card.Actions>
      </Card>
    );
  };

  const getPost = () => {
    database().ref('posts/').on('value', data => {
      const posts = [];
      data.forEach((snap) => {
        if (snap.child('postOwner').child('userID').exists() && snap.child('postOwner').child('userID').val() == auth().currentUser.uid) {
          let child = snap.val();
          let comment = snap.child('postComment').numChildren();
          let { userName, userImage } = snap.child('postOwner').val();
          console.log(`woy ${userName}`);

          posts.push({
            id: snap.child('').key,
            caption: child.postCaption,
            image: child.postImage,
            address: child.postAddress,
            date: child.postDate,
            like: child.postLike,
            comment: comment,
            username: userName,
            userimage: userImage
          });
        }
      });
      setPosts(posts.reverse());
    });
  }

  useEffect(() => {
    const data = database()
      .ref('/users/' + auth().currentUser.uid)
      .on('value', snapshot => {
        console.log('Username : ', snapshot.child('name').val());
        setUsername(snapshot.child('name').val());
        setUserImage(snapshot.child('userImage').val());
        if (snapshot.child('bio').exists) {
          console.log('user bio : ' + snapshot.child('bio').val());
          if (snapshot.child('bio').val() == null) {
            setBio('Bio Pengguna Tidak Ditemukan');
          } else {
            setBio(snapshot.child('bio').val());
          }
        }
      });

    getPost();
  }, []);
  const renderImage = () => {
    if (userImage == null || userImage == '') {
      return (
        <Image
          source={require('../../assets/place-holder.png')}
          style={{ width: 85, height: 85, borderRadius: 85 / 2 }}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: userImage }}
          style={{ width: 85, height: 85, borderRadius: 85 / 2 }}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          alignSelf: 'stretch',
          padding: 24,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{ flex: 0.8, flexDirection: 'row', alignSelf: 'stretch' }}>
          {renderImage()}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignSelf: 'stretch',
              marginLeft: 16,
            }}>
            <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>
              {username}
            </Text>
            <Text style={{ color: '#000000', fontSize: 12, marginTop: 4 }}>
              {bio}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Button
            mode="contained"
            style={{ marginTop: 20 }}
            color="#0984E3"
            onPress={() => navigation.navigate('EditProfile')}>
            EDIT PROFILE
          </Button>
          <Button
            mode="contained"
            style={{ marginTop: 20 }}
            color="#0984E3"
            onPress={() => logout()}>
            Logout
          </Button>
        </View>
      </View>

      <View style={styles.Container}>
        <FlatList data={posts} renderItem={PostItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 4,
    backgroundColor: '#D3D3D3',
  },
  CardAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  CardContainer: {
    marginTop: 16,
    width: width,
  },
});

export default AccountScreen;
