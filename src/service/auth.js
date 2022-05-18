//importation module firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from "react";
import { getAuth, signInWithPopup, getRedirectResult, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
        apiKey: "AIzaSyANrvaTN4WHqC7I3-YVY2FGr4lIqH6eH64",
        authDomain: "auth-8a311.firebaseapp.com",
        projectId: "auth-8a311",
        storageBucket: "auth-8a311.appspot.com",
        messagingSenderId: "922361250788",
        appId: "1:922361250788:web:6c21bef2e98b610fc2bdf1",
        measurementId: "G-5WJ0T2FEPH"
      };

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'fredericignace005@gmail.com'
  });

  const auth = getAuth();



 


  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  auth.languageCode = 'it';


  const Psign = () => {
    
  //const history             = useHistory();

  const [items, setItem] = useState('');
  const [errs, setErr] = useState('');
  
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    const data = user.providerData

    setItem(data)

    //data?.forEach((ele)=> {

      //sessionStorage.setItem('name', ele.displayName);
      //sessionStorage.setItem('image', ele.photoURL);
      //sessionStorage.setItem('email', ele.email);
    //});

    //history.push("/accueil/index");

    // ...
  }).catch((error) => {
    const credential = GoogleAuthProvider.credentialFromError(error);
    setErr(credential);
    // ...
  });

}

  export default Psign;