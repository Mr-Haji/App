import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Geolocation from 'react-native-geolocation-service'

const Home = ({navigation}) => {

  const getLocationHandler = ()=>{
    console.log("running")
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("postion===> ",position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "red" }}>
      <TouchableOpacity onPress={getLocationHandler}>
        <Text>
          Location
        </Text>
      </TouchableOpacity>
      <Text>Home screen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Camera")}>
        <Text>Goto Camera Screen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home