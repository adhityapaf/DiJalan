import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,  
  FlatList,
  Image,
} from 'react-native';

import {Button,IconButton,Colors,Icon,Card,List,Paragraph,Avatar} from 'react-native-paper';

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
  

const PostItem = ({item}) =>{
    return(    
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
    )
} 

const KecelakaanActivity = ()=>{
    return (        
        <View style={styles.Container}>
            <FlatList
            data ={DATA}
            renderItem={PostItem}/>                      
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

export default KecelakaanActivity;