import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,  
  FlatList,  
} from 'react-native';

import {Button,IconButton,Card,Paragraph,Avatar,TextInput} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const LeftContent = props => <Avatar.Image {...props} source={require('../assets/img.jpeg')}/>
const RightContent = props => <IconButton {...props} icon="dots-vertical"/>


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      username: 'Adhit',
      comment:'Waaah bahaya itu'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      username: 'Alwan',
      comment:'Hati - hati yaa'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      username: 'Mufti',
      comment:'Waah'
    },
  ];
  

  const commentItem = ({item}) => (
      
      <View style={styles.comment}>
          <Avatar.Image style={styles.commentAvatar} source={require('../assets/img.jpeg')}/>          
          <View style={styles.Profil}>
                <Text style={styles.TextUsername}>{item.username}</Text>
                <Text style={styles.TextTime}>2 jam</Text>
          </View>
            <Text style={styles.TextComment}>{item.comment}</Text>
      </View>      
  );

const DetailPostActivity = () =>{
    return(   
        <View style={styles.Container}>
            <Card style={styles.CardContainer}>
                <Card.Title title="Username" subtitle="Alamat" left={LeftContent} right={RightContent}/>        
                <Card.Content>          
                    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac hendrerit scelerisque pharetra, diam. Duis ac, molestie fringilla platea purus, duis feugiat pellentesque. </Paragraph>
                </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <View style={styles.CardAction}>
                        <Text>10/10/2020</Text>
                        <Button
                        icon="thumb-up">77</Button>
                        <Button
                        icon="comment"
                        >10</Button>
                    </View>
                </Card.Actions>
            </Card>
            <View style={styles.CommentContainer}>
                <ScrollView>
                    <FlatList
                    data = {DATA}
                    renderItem = {commentItem}
                    />
                </ScrollView>
            </View>
            <View style={styles.ContainerInputComment}>
                <TextInput
                style={styles.InputComment}
                placeholder="comment"
                mode="outlined"
                />               
                <IconButton
                icon="send"
                color="white"
                mode="contained"
                style={styles.ButtonSend}                
                ></IconButton>
            </View>
      </View> 
    )
} 


const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#D3D3D3",                
    },
    CardAction:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",               
        alignItems:"center"
    },  
    CardContainer:{
        flex:2
    },
    CommentContainer:{
        flex:1,                        
    },
    comment:{
        padding:8,
        flexDirection:"row"        
    },
    TextUsername:{
        fontWeight:"bold",
        marginTop:5                
    },
    TextTime:{
        marginTop:5,
        color:"#646464"
    },
    TextComment:{
        marginLeft:8,
        marginTop:5
    },
    ContainerInputComment:{
        flexDirection:"row",
        alignItems:"center",
        padding:8
    },
    InputComment:{
        width:276,
        height:48
    },
    ButtonSend:{
        width:65,
        height:50,        
        backgroundColor:"#0984E3"           
    }
})

export default DetailPostActivity;