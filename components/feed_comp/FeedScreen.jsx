import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import axios from 'axios'

const FeedScreen = ({route , navigation}) => {

    const [postsData, setpostsData] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const {uid} = route.params;

    useEffect(()=>{
getPostData()
    },[])

    const getPostData =  ()=>{
      setisLoading(true)
      setpostsData([])
        database()
  .ref(`/posts/${uid}`)
  .on('child_added', snapshot => {
    const data = JSON.stringify(snapshot.val())
    setpostsData(prev=>[...prev,JSON.parse(data)])
      setisLoading(false)
    });
    }
  console.log('Post data: ', postsData);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("createpost",{uid})}>
        <Text style={{color: "black"}}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getPostData}>
        <Text style={{color: "black"}}>Get data</Text>
      </TouchableOpacity>
{/* single post view */}
      <View>
        {
            isLoading ? <Text style={{color:"black"}}>Loading...</Text> : postsData?.map((e,i)=><View key={i} style={styles.postContainer}>
            <Text style={styles.postText}>{e.post.body}</Text>
            {e.post.ImgURL && <Image source={{uri: e.post.ImgURL, }} style={{width:200, height:200,borderRadius:5}} />}
        </View>
        )
        }
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
    container: {
        // backgroundColor: "red",
        flex: 1,
        alignItems: "center",
        padding: 20,
        gap: 20,
    },
    postContainer:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#f532",
        borderRadius: 10,
        marginBottom: 5,
    },
    postText: {
        color: "black"
    }
})


export default FeedScreen