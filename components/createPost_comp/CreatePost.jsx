import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';
import { Utils } from '@react-native-firebase/app';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'


const CreatePost = ({route, navigation}) => {
    const [postBody, setPostBody] = useState()
    const [imageCaptured, setImageCaptured] = useState()
    const [ImgURL, setImgURL] = useState()


    const {uid} = route.params
// open gallery to pload image
    const open_gallery =async ()=>{
      const result = await launchImageLibrary();
      if(!result.didCancel){
          setImageCaptured(result?.assets[0].uri)
          // path to existing file on filesystem
          // const pathToFile = result.assets[0].uri
         
      }
              console.log(result)
  }

    const addPostInDB = async ()=>{
        
        if(imageCaptured){
           // uploads file storage
         const reference = storage().ref(`/images/${uid}/${Math.floor(Math.random()*554656464)}`)
         await reference.putFile(imageCaptured).then(
          //  ImgURI = await reference.getDownloadURL()
          console.log("uploaded successfully")
        ).catch(err=>console.log(err))
        const ImgURL = await reference.getDownloadURL()
        // add in database
        await database().ref(`/posts/${uid}/${Math.floor(Math.random()*554656464)}`).set({
            post: {
              body:postBody,
              ImgURL
            }
          
        })

        setPostBody("")
        navigation.navigate("feed",{uid})
      }
        else{
          await database().ref(`/posts/${uid}/${Math.floor(Math.random()*554656464)}`).set({
            post: {
              body:postBody,
            }
          
        })

        setPostBody("")
        navigation.navigate("feed",{uid})
        }

    }
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputBox} value={postBody} onChangeText={e=>setPostBody(e)} placeholder="what's in your mind" />
      <View>
            {
                imageCaptured && <Image source={{uri: imageCaptured, }} style={{width:200, height:200}} />
            }
        </View>
      <TouchableOpacity
        onPress={open_gallery}>
          <Text>Pics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addPostInDB}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreatePost

const styles = StyleSheet.create({
container:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5007"
},
inputBox:{
    borderWidth: 2,
    borderColor: "#ffff",
    borderRadius:15,
    paddingHorizontal: 20,
    paddingVertical:20,
    width: "80%",
    textAlign: "center"
},
button:{
backgroundColor: "blue",
paddingHorizontal: 20,
paddingVertical:10,
marginTop:5,
borderRadius:50
},

})