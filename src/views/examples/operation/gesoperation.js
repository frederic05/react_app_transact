import axios from 'axios';
import * as React from 'react';
import TableOperation from './tableop';
import httMehode from 'common/service';
import Header from "components/Headers/Header";
import { AccountDetails } from './account-details';
import { PaymentDetails } from './payment-details';
import { PersonalDetails } from './personal-details';
import { Fade } from "@progress/kendo-react-animation";
import { Stepper } from '@progress/kendo-react-layout';
import { Button } from "@progress/kendo-react-buttons";
import { Window,} from "@progress/kendo-react-dialogs";
import { useState, useCallback,useEffect } from "react";
import {Card,CardHeader,Container,Row}  from "reactstrap";
import { Form, FormElement } from '@progress/kendo-react-form';
import {Notification,NotificationGroup,} from "@progress/kendo-react-notification";

const stepPages = [AccountDetails, PersonalDetails, PaymentDetails];

const ListeOperation = () => {

    /************************** MODAL USESTATE *****************/ 
    const [visible, setVisible]     = useState(false);
    const toggleDialog              = () => {setVisible(!visible);}
    const [success, setSuccess]     = useState(false);  
    const onToggle                  = () => setSuccess(true);
        /******************* FIN *****************/

        /************************** GLOBAL STATE *****************/ 
    const [products, setProducts]   = useState(null);
    const [step, setStep]           = useState(0);
    const [formState, setFormState] = useState({});
    const [steps, setSteps]         = useState([{
                                            label: 'reference ',
                                            isValid: undefined
                                            }, {
                                            label: 'infos transactions',
                                            isValid: undefined
                                            }, {
                                            label: 'autres',
                                            isValid: undefined
                                            }]);
        /******************* FIN *****************/

        const Listedat = ()=>{
            axios.get(httMehode.url+'listop')
            .then((res)=> {
                if(res.status === 200 || res.data.length >=1){   
                    setProducts(res.data)   
                    }})
            .catch((error) => {console.log(error);})
          }
          useEffect(()=>{  
            Listedat();
          },[httMehode.url]);

        /******************* TRAITEMENT STEP MULTIFORME ********************/
       
        const lastStepIndex = steps.length - 1;
        const isLastStep = lastStepIndex === step;
        const isPreviousStepsValid = steps.slice(0, step).findIndex(currentStep => currentStep.isValid === false) === -1;


        const onStepSubmit = useCallback(event => {
            const {
            isValid,
            values
            } = event;
            const currentSteps = steps.map((currentStep, index) => ({ ...currentStep,
            isValid: index === step ? isValid : currentStep.isValid
            }));
            setSteps(currentSteps);
            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);

            if (isLastStep && isPreviousStepsValid && isValid) {


            console.log(JSON.stringify(values));
            const data = values
                                    axios.post(httMehode.url+'addOperation', data)
                                     .then((res)=> {
                                          if(res.status === 200){  
                                            setTimeout( () => {
                                                setStep(() => Math.min(step - 2, lastStepIndex));
                                                setFormState({})   
                                                toggleDialog()
                                                onToggle()
                                                Listedat()                                      
                                              }, 1000)                 
                                                                                                                                                                           
                                             }})
                                     .catch((error) => {console.log(error);});
            }
        }, [steps, isLastStep, isPreviousStepsValid, step, lastStepIndex]);
        
        const onPrevClick = useCallback(event => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        }, [step, setStep]);

        /******************************* FIN ******************************/

    return ( 
        <>
        <Header />
            <Container className="mt--7" fluid>
                                <Row>
                                    <div className="col">                         
                                    <Card className="shadow">
                                        <CardHeader className="border-0">
                                            GESTION DES OPERATIONS
                                            <Button className="float-right" themeColor={"tertiary"} size="sm" onClick={()=>(toggleDialog())}>
                                            <i className="ni ni-credit-card" /> FAIRE UNE TRANSACTION
                                            </Button>
                                        </CardHeader>
                                    </Card>
                                    </div>                   
                                </Row>
                            <Card className="shadow" >
                            <TableOperation products={products}/>
                            </Card>
            </Container>

            {visible && ( <Window title={"GESTION DES OPERATIONS"} onClose={toggleDialog} initialHeight={600} initialWidth={1000} style={{backgroundColor:"#E7EFF1"}}>
                      <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
                            <Stepper value={step} items={steps} />
                            <Form initialValues={formState} onSubmitClick={onStepSubmit} render={formRenderProps => <div style={{ alignSelf: 'center'}}>
                                <FormElement style={{width: 480 }}>
                                    {stepPages[step]}

                                    <span style={{marginTop: '40px'}} className={'k-form-separator'} />

                                    <div style={{justifyContent: 'space-between',alignContent: 'center'}} className={'k-form-buttons k-button k-button-md k-rounded-md k-button-solid k-button-solid-bases-end'}>
                                    <span style={{alignSelf: 'center'}}>Etape {step + 1} / 3</span>
                                    <div>
                                        {step !== 0 ? <Button style={{marginRight: '16px'}} onClick={onPrevClick}>
                                                                Précédent
                                                      </Button> : undefined}

                                        <Button themeColor={'primary'} disabled={isLastStep ? !isPreviousStepsValid : false} onClick={formRenderProps.onSubmit}>
                                        {isLastStep ? 'Valider' : 'Suivant'}
                                        </Button>
                                    </div>
                                    </div>
                                </FormElement>
                                </div>} />
                      </div>
            </Window>)}

            <NotificationGroup style={{right: 0, bottom: 0, alignItems: "flex-start",flexWrap: "wrap-reverse",}}>
            <Fade>
              {success && (
                <Notification
                  type={{ style: "success", icon: true }}
                  closable={true}
                  onClose={() => setSuccess(false)}
                >
                  <span>Enregistrement effectuer avec succès</span>
                </Notification>
              )}
            </Fade>
            </NotificationGroup>
        </>
     );
}
 
export default ListeOperation;