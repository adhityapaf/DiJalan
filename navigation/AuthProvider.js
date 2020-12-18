import React, { useState, createContext } from 'react';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider
        value={{
             user,
             setUser,
             login: async (email, password) => {
                try {
                   await auth().signInWithEmailAndPassword(email, password);
                } catch (error) {
                    console.log(error);
                }
             }, register: async (email, password, nama, noHp) => {
                 try {
                     
                     await auth().createUserWithEmailAndPassword(email, password);
                     var user = auth().currentUser;
                     await database().ref('/users/'+user.uid)
                     .set({
                         name: nama,
                         noHp: noHp
                     })
                     .then(() => console.log("User "+user.uid+" Created with additional data"));

                 } catch (error) {
                     console.log(error);
                 }
             }, logout: async () => {
                 try {
                     await auth().signOut();
                 } catch (error) {
                     console.log(error);
                 }
             }
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;