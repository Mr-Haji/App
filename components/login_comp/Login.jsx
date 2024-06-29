import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';


export const Login = ({navigation}) => {

    const [data, setdata] = useState({})

    const on_change_handle = (field, value)=>{
        setdata(prev=>({...prev,[field]:value}))
    }

    const submit_handle =()=>{

            auth().signInWithEmailAndPassword(data.email, data.password).then(res=>{
                console.log("user signed in", res.user.uid)
                const uid = res.user.uid
                navigation.navigate("feed",{uid})
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
                    Login
                </Text>
                <View style={styles.input_container}>
                    <TextInput onChangeText={(e) => on_change_handle('email', e)} style={styles.input} placeholder='Enter email address' />
                    <TextInput onChangeText={(e) => on_change_handle('password', e)} style={styles.input} placeholder='Enter password' secureTextEntry={true} />
                </View>

                <TouchableOpacity onPress={submit_handle} style={styles.button}>
                    <Text style={styles.button_text}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{textAlign:'center', marginBottom:10}}>
                    Don't have an account
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} style={styles.button}>
                    <Text style={styles.button_text}>
                        Sign Up
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
        backgroundColor: "red"
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
        backgroundColor: '#7cacf8',
        paddingVertical: 15,
        borderRadius: 10

    },
    button_text: {
        textAlign: 'center',
        color: 'white'
    }
})

