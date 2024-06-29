import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {launchCamera, launchImageLibrary} from "react-native-image-picker"

const Camera = ({navigation}) => {
    const [imageCaptured, setImageCaptured] = useState()

    const open_camera =async ()=>{
        const result = await launchCamera({mediaType:"photo"})
        if(!result.didCancel){

            setImageCaptured(result?.assets[0]?.uri)
            console.log(result?.assets[0]?.uri)
        }
    }
    const open_gallery =async ()=>{
        const result = await launchImageLibrary();
        // if(!result.didCancel){
        //     setImageCaptured(result?.assets[0].uri)
        // }
                console.log(result)
    }



    return (
      <View style={{justifyContent:"center", alignItems:"center", backgroundColor: "red"}}>
        <Text>Camera and gallery</Text>
        <View>
            {
                imageCaptured && <Image source={{uri: imageCaptured, }} style={{width:200, height:200}} />
            }
        </View>
        <TouchableOpacity onPress={open_camera}>
            <Text>
                open camera
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={open_gallery}>
            <Text>
                open gallery
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      </View>
    )
}

export default Camera