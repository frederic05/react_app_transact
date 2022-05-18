/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import { useState}  from "react";
import {useHistory} from "react-router-dom";
import    axios     from "axios";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, getRedirectResult, GoogleAuthProvider } from "firebase/auth";



/*CONNECTION PAR LA SAISIR DES ACCES*/

const Login = () => {

  const history                   = useHistory();
  const url                       = 'http://localhost:4003/userAuth'
  const [p_login, setLogin]       = useState('');
  const [p_mdp, setMdp]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [err, setErr]             = useState(false);
  const data                      = {p_login, p_mdp}
  

   const Handler = ()=> { 
     
                              setLoading(true);
                              axios.post(url, data)
                               .then((res)=> {
                                    if(res.status === 200){
                                      const result = res.data;
                                      result?.forEach(element => {
                                        const ctx = element._resultat
                                        if (ctx._status === 200){
                                          history.push("/auth/otp");
                                        }else{
                                          setTimeout(()=> setLoading(false), 2000)
                                          setTimeout(()=> setErr(true), 2000)                                         
                                          setTimeout(()=> setErr(false), 5000)
                                          console.log('LOGIN OU MOT DE PASSE INCORRECT !')
                                        }
                                      });                                                                      
                                       }})
                               .catch((error) => {console.log(error);});}

/* FIN CONNECTION PAR LA SAISIE DES ACCES*/

/************************************************************************************************************************************************* */

/*CONNECTION AVEC LE BOUTON DE GOOGLE*/

//DECLARATION DES VARIABLES
const firebaseConfig = {
  apiKey            : "AIzaSyANrvaTN4WHqC7I3-YVY2FGr4lIqH6eH64",
  authDomain        : "auth-8a311.firebaseapp.com",
  projectId         : "auth-8a311",
  storageBucket     : "auth-8a311.appspot.com",
  messagingSenderId : "922361250788",
  appId             : "1:922361250788:web:6c21bef2e98b610fc2bdf1",
  measurementId     : "G-5WJ0T2FEPH"
};

const provider      = new GoogleAuthProvider();
const app           = initializeApp(firebaseConfig);
const analytics     = getAnalytics(app);
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
'login_hint': 'fredericignace005@gmail.com'
});

const auth = getAuth();

//DEBUT TRAITEMENT

getRedirectResult(auth)
.then((result) => {
  const credential    = GoogleAuthProvider.credentialFromResult(result);
  const token         = credential.accessToken;
  const user          = result.user;
}).catch((error) => {
  const errorCode     = error.code;
  const errorMessage  = error.message;
  const email         = error.email;
  const credential    = GoogleAuthProvider.credentialFromError(error);
});

auth.languageCode = 'it';

const initlogin = () => {

  signInWithPopup(auth, provider)
  .then((result) => {
    const credential  = GoogleAuthProvider.credentialFromResult(result);
    const token       = credential.accessToken;
    const user        = result.user;
    const data        = user.providerData
    data?.forEach((ele)=> {
      sessionStorage.setItem('name', ele.displayName);
      sessionStorage.setItem('image', ele.photoURL);
      sessionStorage.setItem('email', ele.email);
    });

    history.push("/accueil/index");

  }).catch((error) => {
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

/*FIN CONNECTION AVEC LE BOUTON DE GOOGLE*/



  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <h1>Se connecter avec </h1>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={() => initlogin()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h2>Se connecter avec mes acces</h2>
            </div>

               {err && <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{textAlign: 'center'}}>
                  Login ou mot de passe incorrect !
                </div>}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Login"
                    type="text"
                    autoComplete="new-text"
                    value={p_login}
                    onChange={(e)=> setLogin(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    autoComplete="new-password"

                    value={p_mdp}
                    onChange={(e)=> setMdp(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Se souvenir de moi</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={Handler}>
                {loading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Se connecter  
                </Button>

               

                
              </div>
              
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Mot de passe oublié?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Creer un compte</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
