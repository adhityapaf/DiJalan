import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,  
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import {Button,IconButton,Colors,Icon,Card,List,Paragraph,Avatar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LeftContent = props => <Avatar.Image {...props} source={require('../assets/img.jpeg')}/>
const RightContent = props => <IconButton {...props} icon="dots-vertical"/>

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

const Item = () => {
  const navigation = useNavigation();
  return(     
      <Card style={styles.CardContainer}>
      <Card.Title title="Username" subtitle="Alamat" left={LeftContent} right={RightContent}/>        
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail')}>
        <View>
      <Card.Content>          
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac hendrerit scelerisque pharetra, diam. Duis ac, molestie fringilla platea purus, duis feugiat pellentesque. </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} on />
      </View>
      </TouchableWithoutFeedback>   
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
  )
}

const PostItem = ({item}) =>{  
    return( 
      <Item />
    )
} 

const JalanRusakjActivity = ({navigation})=>{    
    return (        
        <View style={styles.Container}>
          <TouchableWithoutFeedback>
            <FlatList            
            data ={DATA}
            renderItem={
              PostItem}/>                      
              </TouchableWithoutFeedback>
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
    }  
})

export default JalanRusakjActivity;