import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Alert, ToastAndroid} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (error) {
            console.log(error);
            ToastAndroid.show('Ups ada error : '+error, ToastAndroid.SHORT);
          }
        },
        register: async (email, password, nama, noHp,bio) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            var user = auth().currentUser;
            await database()
              .ref('/users/' + user.uid)
              .set({
                name: nama,
                noHp: noHp,
                bio: bio
              })
              .then(() =>
                console.log(
                  'User ' + user.uid + ' Created with additional data',
                ),
              );
          } catch (error) {
            console.log(error);
            ToastAndroid.show('Ups ada error : '+error, ToastAndroid.SHORT);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
            ToastAndroid.show('Ups ada error : '+error, ToastAndroid.SHORT);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
