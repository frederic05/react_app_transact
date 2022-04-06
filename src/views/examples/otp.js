
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

const Otp = () => {


const [p_otp, setP_otp]= useState('');
console.log('setP_otp',p_otp);
const Handler = ()=>{
    alert('bonjour');
  }

    return ( 
        <>
        <Col lg="5" md="7">      
        <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                    <h1>Saisissez votre OTP</h1>
                </div>       
        </CardHeader>

        <CardBody className="px-lg-5 py-lg-5">
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
                  Valider
                </Button>
            </div>

        </CardBody>
        </Card>       
        </Col>
        </>
    );
};

export default Otp;