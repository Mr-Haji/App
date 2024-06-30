import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';


export const Firebase_Auth = ({navigation}) => {

    const [data, setdata] = useState({})

    const on_change_handle = (field, value)=>{
        setdata(prev=>({...prev,[field]:value}))
    }

    const submit_handle =()=>{

       
            auth().createUserWithEmailAndPassword(data.email, data.password).then(res=>{
                console.log("user created", res.user.uid)
                const uid = res.user.uid
                // data saved in database
                database().ref(`/users/${uid}`).set({
                    email: res.user.email,
                    uid,
                })
                navigation.navigate("feed",{uid})
                // navigation.navigate("Camera")
            })
            .catch(error=>{
                console.log("error====> ", error)
            })
            console.log(data)
      
    }




    return (
        <View style={styles.container}>

            <View style={{ gap: 20 }}>
                <Text style={styles.title}>
                    Signup
                </Text>
                <View style={styles.input_container}>
                    <TextInput onChangeText={(e) => on_change_handle('email', e)} style={styles.input} placeholder='Enter email address' />
                    <TextInput onChangeText={(e) => on_change_handle('password', e)} style={styles.input} placeholder='Enter password' secureTextEntry={true} />
                </View>

                <TouchableOpacity onPress={submit_handle} style={styles.button}>
                    <Text style={styles.button_text}>
                        Signup
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{textAlign:'center', marginBottom:10}}>
                    Already have an account
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("login")} style={styles.button}>
                    <Text style={styles.button_text}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "purple"
        // alignItems:'center'

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    input_container: {
        gap: 20,

    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10
    },
    button: {
        backgroundColor: 'pink',
        paddingVertical: 15,
        borderRadius: 10

    },
    button_text: {
        textAlign: 'center',
        color: 'black'
    }
})

