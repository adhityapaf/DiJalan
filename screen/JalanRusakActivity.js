import React,{useEffect,useState} from 'react';
import {  
  StyleSheet,  
  View,
  Text,  
  FlatList,  
  TouchableWithoutFeedback,
  ActivityIndicator,
  ToastAndroid,
  Modal,  
} from 'react-native';

import {Button,IconButton,Card,Paragraph,Avatar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const postLike =((id,like)=>{
  let convertLike = like+1;
  database()
  .ref('/posts/'+id)
  .update({
    postLike: convertLike,
  })
  .then(   
  ToastAndroid.show('Berhasil Like', ToastAndroid.SHORT)
  );    
})

const JalanRusakjActivity = ({navigation})=>{    
  const [loading,setLoading] =useState(true);
  const [posts,setPosts] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(()=>{    
    database().ref('posts/').on('value',data=>{
      const posts = [];
      data.forEach((snap)=>{
        let child = snap.val();        
        let comment = snap.child('postComment').numChildren(); 
        let {userName,userImage} = snap.child('postOwner').val();        
        posts.push({             
          id:snap.child('').key,                    
          caption:child.postCaption,
          image:child.postImage,          
          address:child.postAddress,
          date:child.postDate,
          like:child.postLike,
          comment:comment,
          username:userName,
          userimage:userImage          
        });
    });                 
      setPosts(posts.reverse());      
      setLoading(false);            
    });  
  },[]);

  const sheetRef = React.useRef(null);

  if(loading){
    return <ActivityIndicator size="large" color="#0984E3" />
  }  
  const Item = ({post}) => {
    const navigation = useNavigation();
    return(     
        <Card style={styles.CardContainer}>
        <Card.Title 
        title={post.username} 
        subtitle={post.address} 
        left={props => <Avatar.Image {...props} source={{ uri: post.userimage }}/>} 
        right={props => <IconButton {...props} icon="dots-vertical" onPress={()=> setModal(true)}/>}/>        
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail',{"id":post.id,"post":"/posts/"})}>
          <View>
        <Card.Content>          
          <Paragraph>{post.caption} </Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: post.image }} on />
        </View>
        </TouchableWithoutFeedback>   
        <Card.Actions>
            <View style={styles.CardAction}>
                <Text>{post.date}</Text>
                <Button
                icon="thumb-up" onPress={()=> postLike(post.id,post.like)}>{post.like}</Button>
                <Button
                icon="comment"
                >{post.comment}</Button>
            </View>
        </Card.Actions>
      </Card>    
    )
  }
  
  const PostItem = ({item}) =>{  
      return( 
        <Item post={item}/>
      )
  } 

    return (    
      <View style={styles.Container}>          
        <>
            <FlatList            
            data ={posts}
            renderItem={PostItem}
            keyExtractor={item => item.id}/>                                    
        </>    
        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={styles.modelView}>
            <View style={styles.modalView}>
              <Text>Laporkan</Text>         
              <Button
              style={styles.buttomButton}
              mode='contained'
              color='white'
              onPress={ ()=> ToastAndroid.show('Berhasil Lapor', ToastAndroid.SHORT)}
              >Informasi Tidak Benar</Button>
              <Button
              style={styles.buttomButton}
              mode='contained'
              color='white'
              onPress={ ()=> ToastAndroid.show('Berhasil Lapor', ToastAndroid.SHORT)}
              >Foto Yang tidak sesuai</Button>
              <Button
              style={styles.buttomButton}
              mode='contained'
              color='white'
              onPress={ ()=> ToastAndroid.show('Berhasil Lapor', ToastAndroid.SHORT)}
              >Mengandung Kekerasa</Button>              
            </View>
          </View>
        </Modal>       
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
        marginVertical:4
    },  
    modelView: {
      width:"100%",
      height:"100%",            
      justifyContent:"flex-end",
      alignItems: "center",      
    },
    modalView: {            
      width: "100%",
      height: 300,      
      backgroundColor: "#0984E3",      
      alignItems: "center",      
      justifyContent: "space-around",
      borderTopLeftRadius:10,
      borderTopRightRadius:10,           
      paddingHorizontal:16,
    },
    modalText: {
      fontSize: 20,
      textAlign: "center"
    },
    buttomButton:{
      width:"100%",  
    }  
})

export default JalanRusakjActivity;