
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
} from "reactstrap";
import OtpInput from 'react-otp-input';
import { useState } from "react";
import {useHistory} from "react-router-dom";
import    axios     from "axios";

const Otp = () => {

const history                 = useHistory();
const url                     = 'http://localhost:4003/otp'
const [p_otp, setP_otp]       = useState('');
const [loading, setLoading]   = useState(false);
const [err, setErr]           = useState(false);
const data                    = {p_otp}


const Handler = ()=> { 
     
    setLoading(true);
    axios.post(url, data)
                               .then((res)=> {
                                    if(res.status === 200){
                                      const result = res.data;
                                      result?.forEach(element => {
                                        const ctx = element._resultat
                                        if (ctx._status === 200){
                                          history.push("/accueil/index");
                                        }else{
                                          setTimeout(()=> setLoading(false), 2000)
                                          setTimeout(()=> setErr(true), 2000)                                         
                                          setTimeout(()=> setErr(false), 5000)
                                          console.log('OTP INVALIDE !')
                                        }
                                      });                                                                      
                                       }})
                               .catch((error) => {console.log(error);});}

    return ( 
        <>
        <Col lg="5" md="7">      
        <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                    <h1>OTP DE VALIDATION</h1>
                </div>  
                <h4 className="text-center">Saisissez le code reçu par mail</h4>     
        </CardHeader>

        <CardBody className="px-lg-5 py-lg-5">
        {err && <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{textAlign: 'center'}}>
                  Votre OTP est erroné ou expiré!
                </div>}
                    <OtpInput 
                            separator={
                            <span>
                                <strong>.</strong>
                            </span>
                            }
                            inputStyle={{
                            width: "3rem",
                            height: "3rem",
                            margin: "0 1rem",
                            fontSize: "2rem",
                            borderRadius: 4,
                            border: "1px solid rgba(0,0,0,0.3)"
                            }}
                            id="p_otp" value={p_otp} onChange={setP_otp}  autoFocus OTPLength={6} otpType="number" disabled={true} secure />

            <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={Handler}>
                {loading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Valider
                </Button>
            </div>

        </CardBody>
        </Card>       
        </Col>
        </>
    );
};

export default Otp;