import React from 'react'
import { Button, Text, View } from "react-native";
import * as firebase from 'firebase';
import "firebase/auth";
import { withNavigation } from 'react-navigation';
import LoginScreen from '../views/LoginView/LoginScreen'


function SignOutBtn(props) {

  return (
    <View>
      <Button onPress={() => firebase.auth().signOut().then(()=>{
        props.navigation.navigate("LoginScreen");
      }).catch((err)=> {
        console.log("error " + err)})} title="signOut">
        <Text>Sign Out</Text>
      </Button>
    </View>
  )
}


export default withNavigation(SignOutBtn);
