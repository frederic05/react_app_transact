import {Card,CardHeader,Container,Row}  from "reactstrap";
import Header from "components/Headers/Header.js";
import { useState, useEffect } from "react";
import    axios     from "axios";
import { Window,} from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {Notification,NotificationGroup,} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import httMehode from "common/service";
import validator from 'validator';

import DataTables from "./datatable/dataTable";

const Utilisateur = () => {

  /************************** ERREUR AND SUCCES USESTATE *****************/ 
        const [errorMessage, setErrorMessage] = useState('')
        const [success, setSuccess]           = useState(false);  
        const onToggle                        = () => setSuccess(true);
             /******************* FIN *****************/ 

  /************************** MODAL USESTATE *****************/ 
        const [visible, setVisible]     = useState(false);
        const toggleDialog              = () => {setVisible(!visible);}

            /******************* FIN *****************/
  
/************************** INFORMATATIONS D'AJOUT UTILISATEUR *****************/ 
    const [data, setData]          = useState('') 
    const [p_nom, setNom]          = useState('');
    const [p_prenoms, setPrenoms]  = useState('');
    const [p_login, setLogin]      = useState('');
    const [p_mdp, setMdp]          = useState('');
    const [p_cmdp, setCmdp]        = useState('');
    const [p_statut, setStatut]    = useState(1);
    const [p_email, setEmail]      = useState('');
    const [loading, setLoading]    = useState(false);
    const [vmdp, setVmdp]          = useState(false)
/************************** FIN*******************************************/  


  /************************** FONCTION DE VERIFICATION  ET CONFIRMATION MOT DE PASSE  *****************/ 
    const validate = (value) => {
      if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })){
        setErrorMessage('')
      }else{
        setErrorMessage('votre mot de passe est faible')
      }
    }           
            /************************** FIN ***************************/ 


/**************** CONSOMMATION API D'AJOUT UTILISATEUR *****************/ 

    const handleSubmit = (e)=> {
      e.preventDefault();
      setLoading(true);
      const data = {p_nom,p_prenoms,p_login,p_mdp,p_statut,p_email}
                              axios.post(httMehode.url+'userAdd', data)
                               .then((res)=> {
                                    if(res.status === 200){                                     
                                      setTimeout( () => {
                                        setLoading(false);
                                        toggleDialog();
                                        onToggle();   
                                        Listedat();                                     
                                      }, 1000)                                                                                                                            
                                       }})
                               .catch((error) => {console.log(error);});
      
    }
    const reset = ()=>{
      setNom(''); setPrenoms('');
      setMdp(''); setCmdp('');
      setEmail(''); setLogin('');
    }
/**************** FIN *****************/

/*****************FONCTION POUR LISTER DES UTILISATEURS **********************************/

    const Listedat = ()=>{
      axios.get(httMehode.url+'userList')
      .then((res)=> {
          if(res.status === 200 || res.data.length >=1){  
            setData(res.data)   
              }})
      .catch((error) => {console.log(error);})
    }

    useEffect(()=>{
      Listedat();
    },[httMehode.url])

 /****************************************     FIN   **********************************/

{/* const columns = useMemo(()=>[
  {
      Header: "ID",
      accessor: "id"
  },
  {
      Header: "Nom",
      accessor: "r_nom",
      filter: "includes"
  },
  {
      Header: "Prenoms",
      accessor: "r_prenoms"
  },
  {
      Header: "Login",
      accessor: "r_login"
  },
  {
      Header: "Date",
      accessor: "r_date",
     
  },
  {
      Header: "Statut",
      accessor: "r_statut"
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: row  => (
      <div class="btn-group" role="group" aria-label="Basic example">
            <Button  color="primary" onClick={e => handleEdit(row.row.original)}><i className="fa fa-eye"/> </Button>
            <Button  color="info" ><i className="fa fa-edit"/>  </Button>
            <Button  color="danger"  onClick={e => handleSup(row.row.original)}><i className="fa fa-trash"/> </Button>
    </div>
    )
  }
])*/}


    return ( 
        <>
            <Header />         
            <Container className="mt--7" fluid>
                            <Row>
                                  <div className="col">                         
                                  <Card className="shadow">
                                      <CardHeader className="border-0">
                                          GESTION DES UTILISATEURS 
                                          <Button className="float-right" themeColor={"tertiary"} size="sm" onClick={()=>(reset(), toggleDialog())}>
                                          <i className="ni ni-fat-add" /> Creer un utilisateur
                                          </Button>
                                      </CardHeader>
                                  </Card>
                                  </div>                   
                            </Row>
                          <Card className="shadow">
                                 {/* {data && <Tabledata columns={columns} data={data}/>}*/}
                                  <DataTables data={data} Listedat={Listedat}/> 
                          </Card>
            </Container>
      
            {visible && ( <Window title={"AJOUT UTILISATEUR"} onClose={toggleDialog} initialHeight={300} initialWidth={700} style={{backgroundColor:"#E7EFF1"}}>
                      <form className="k-form" onSubmit={handleSubmit}>
                              <fieldset style={{marginBottom:'15px'}}>
                              <span style={{ color: 'red', alignItems: 'center'}}>{errorMessage}</span>
                                      <div className="row example-wrapper">                          
                                        <div className="col-12 col-md-6 example-col">
                                                  <Input label="Entrez votre nom svp"             type="text"       required value={p_nom}      onChange={(e)=> setNom(e.target.value)}/>
                                                  <Input label="Entrez votre email svp"           type="email"      required  value={p_email}   onChange={(e)=> setEmail(e.target.value)}/>
                                                  
                                                  <Input label="Entrez votre mot de passe svp"    type="password"   required  value={p_mdp}     onChange={(e)=> (setMdp(e.target.value),validate(e.target.value))}/>
                                        </div>
                                        <div className="col-12 col-md-6 example-col">
                                                  <Input label="Entrez votre prenom svp"          type="text"       required value={p_prenoms}  onChange={(e)=> setPrenoms(e.target.value)}/>
                                                  <Input label="Entrez votre login svp"           type="text"       required  value={p_login}   onChange={(e)=> setLogin(e.target.value)}/>
                                                  <Input label="Confirmez votre mot de passe svp" type="password"   required value={p_cmdp}     onChange={(e)=>  (setCmdp(e.target.value)) }/>
                                        </div>
                                      </div>
                              </fieldset>
                              
                              <div className="text-right">
                                    <button type="button" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleDialog}>
                                      Annuler
                                    </button> {'  '}
                                    
                                    <button type="submit" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" >
                                    {loading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}  Valider
                                    </button>
                              </div>
                      </form>
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
 
export default Utilisateur;