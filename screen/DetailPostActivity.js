import React,{useEffect,useState}  from 'react';
import {  
  StyleSheet,  
  View,
  Text,  
  FlatList,  
} from 'react-native';

import {Button,IconButton,Card,Paragraph,Avatar,TextInput} from 'react-native-paper';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const postComment = (ref,comment,username)=>{    
    database()
    .ref(ref)
    .push()
    .set({
        name:username,
        comment:comment,
        date:getCurrentDate()
    })
    .then(()=>console.log("berhasil"));
}
const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + '/' + month + '/' + year; //format: dd/mm/yyyy;
  };

const commentItem = ({item}) => (      
      <View style={styles.comment}>
          <Avatar.Image style={styles.commentAvatar} source={require('../assets/img.jpeg')}/>          
          <View style={styles.Profil}>
                <Text style={styles.TextUsername}>{item.username}</Text>                
          </View>
            <Text style={styles.TextComment}>{item.comment}</Text>
      </View>      
  );

const DetailPostActivity = ({route,navigation}) =>{
    const [comment,setComment] = useState("");
    const [listComment,setListComment] = useState([]);
    const [username,setUserName] = useState("");    
    const {id,post} = route.params;
    const ref = post+id+"/postComment";    
    useEffect(()=>{
        database()
        .ref('/users/' + auth().currentUser.uid + '/name')
        .once('value')
        .then((snapshot) => {          
          setUserName(snapshot.val());
        }); 
        database()
        .ref(ref)
        .on('value',comments=>{
            const dataComments = [];
            comments.forEach((snap)=>{
                let child = snap.val();
                dataComments.push({
                    id:snap.child('').key,
                    comment:child.comment,
                    date:child.date,
                    username:child.name
                })
            })            
            setListComment(dataComments.reverse());            
        })    
    },[]);
    return(   
        <View style={styles.Container}>
            <View style={styles.CommentContainer}>                
                    <FlatList
                    data = {listComment}
                    renderItem = {commentItem}
                    />                
            </View>
            <View style={styles.ContainerInputComment}>
                <TextInput
                style={styles.InputComment}
                placeholder="comment"
                mode="outlined"
                value={comment}                                
                onChangeText={comment =>setComment(comment)}
                />               
                <IconButton
                icon="send"
                color="white"
                mode="contained"
                onPress={()=> [postComment(ref,comment,username),setComment('')]}
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
        flexDirection:"row",
        backgroundColor:"white",
        marginVertical:6                
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