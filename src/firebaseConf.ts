import * as firebase from 'firebase';
import { toast } from './toast';
import { resolve } from 'dns';

const config = {
    apiKey: "AIzaSyB-YJRIYi9xMAzq9Nai32m5RFvhLo71rkM",
    authDomain: "basic-18c8b.firebaseapp.com",
    databaseURL: "https://basic-18c8b.firebaseio.com",
    projectId: "basic-18c8b",
    storageBucket: "basic-18c8b.appspot.com",
    messagingSenderId: "586729346745",
    appId: "1:586729346745:web:0a2056d587b4a311a42d68",
    measurementId: "G-MCHXD7YFB7"
}

firebase.initializeApp(config);

export function logoutUser(){
    return firebase.auth().signOut();
}

export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if (user){
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    }) 
}

export async function loginUser(username:string, password: string){    
    const email = `'${username}@mayaflores.com`;

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        return true;
    } catch(error) {
        toast(error.message, 4000);
        return false;
    }
    //authenticate with firebase
    //if present, show dashboard
    //if not, show error
}

export async function registerUser(username: string, password: string){
    const email = `'${username}@mayaflores.com`;

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email,password);
        return true;
    } catch(error){
        toast(error.message, 4000);
        return false;
    }

}