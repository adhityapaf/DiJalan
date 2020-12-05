import React, { useState } from 'react';

import { Image, View, Text, Dimensions, ScrollView } from "react-native";
import { TextInput, Button } from 'react-native-paper';

const EditProfile = () => {
    const [name, setName] = useState("");
    const [noHandphone, setNoHandphone] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");

    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', padding: 16 }}>
                <Image
                    source={require("../../assets/image_female.png")}
                    style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                />

                <Text style={{ color: '#449AE9', marginTop: 8, fontFamily: 'monospace' }}>Change Profile Photo</Text>

                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', marginTop: 16 }}>
                    <TextInput
                        label="Nama Lengkap"
                        value={name}
                        onChangeText={name => setName(name)}
                    />

                    <TextInput
                        style={{ marginTop: 8 }}
                        label="No Handphone"
                        value={noHandphone}
                        onChangeText={noHandphone => setNoHandphone(noHandphone)}
                    />

                    <TextInput
                        style={{ marginTop: 8 }}
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        style={{ marginTop: 8 }}
                        label="Bio"
                        value={bio}
                        onChangeText={bio => setBio(bio)}
                    />

                    <TextInput
                        style={{ marginTop: 24 }}
                        label="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={password => setPassword(password)}
                    />

                    <TextInput
                        style={{ marginTop: 8 }}
                        label="Retry Password"
                        secureTextEntry={true}
                        value={retryPassword}
                        onChangeText={retryPassword => setRetryPassword(retryPassword)}
                    />

                    <Button mode="contained" style={{ marginTop: 8 }} color="#0984E3" >
                        SAVE
                    </Button>
                </View>

            </View>
        </ScrollView>
    );
}
export default EditProfile;