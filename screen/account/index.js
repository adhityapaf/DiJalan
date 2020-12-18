import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';

import { Image, View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Card, Button, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

const LeftContent = props => <Avatar.Image {...props} source={require("../../assets/image_female.png")} />
const RightContent = props => <IconButton {...props} icon="dots-vertical" />

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Post First',
        date: '12/12/2020',
        like: 50,
        comment: 10
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Post Second',
        date: '18/12/2020',
        like: 45,
        comment: 8
    },
];

const PostItem = ({ item }) => {
    return (
        <Card style={styles.CardContainer}>
            <Card.Title title={item.title} subtitle="Alamat" left={LeftContent} right={RightContent} />
            <Card.Content>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac hendrerit scelerisque pharetra, diam. Duis ac, molestie fringilla platea purus, duis feugiat pellentesque. </Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
                <View style={styles.CardAction}>
                    <Text>{item.date}</Text>
                    <Button
                        icon="thumb-up">{item.like}</Button>
                    <Button
                        icon="comment"
                    >{item.comment}</Button>
                </View>
            </Card.Actions>
        </Card>
    )
}

function AccountScreen () {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
  const {logout} = useContext(AuthContext);
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ flex: 2, flexDirection: 'column', alignSelf: 'stretch', padding: 24, backgroundColor: '#FFFFFF' }}>
                <View style={{ flex: 0.8, flexDirection: 'row', alignSelf: 'stretch' }}>
                    <Image
                        source={require("../../assets/image_female.png")}
                        style={{ width: 85, height: 85, borderRadius: 85 / 2 }}
                    />
                    <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', marginLeft: 16 }}>
                        <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>nama user</Text>
                        <Text style={{ color: '#000000', fontSize: 12, marginTop: 4 }}>Ini adalah Bio</Text>
                    </View>

                </View>
                <View style={{flex:1, flexDirection: 'column'}}>
                    <Button
                    mode="contained"
                    style={{ marginTop: 20 }}
                    color="#0984E3"
                    onPress={() => navigation.navigate('EditProfile')}
                    >
                    EDIT PROFILE
                    </Button>
                <Button
                    mode="contained"
                    style={{ marginTop: 20 }}
                    color="#0984E3"
                    onPress={() => logout()}
                    >
                    Logout
                    </Button>
            </View>
                </View>

                
            <View style={styles.Container}>
                <FlatList
                    data={DATA}
                    renderItem={PostItem} />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    Container: {
        flex: 4,
        backgroundColor: "#D3D3D3",
    },
    CardAction: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    CardContainer: {
        marginTop: 16
    }
})

export default AccountScreen;