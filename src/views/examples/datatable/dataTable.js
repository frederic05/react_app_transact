import { useState} from "react";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import {Notification,NotificationGroup,} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import { Window,Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Button} from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import {Input,Checkbox } from "@progress/kendo-react-inputs";
import httMehode from "common/service";
import    axios     from "axios";


const initialDataState = {
    sort: [
      {
        field: "code",
        dir: "asc",
      },
    ],
    take: 10,
    skip: 0,
  };

const DataTables = ({data,Listedat}) => {

    const [dataState, setDataState] = useState(initialDataState);

     /************************** ERREUR AND SUCCES USESTATE *****************/ 
     const [errorMessage, setErrorMessage] = useState('')
     const [success, setSuccess]           = useState(false);  
     const onToggle                        = () => setSuccess(true);
     const [confim, setConfim]             = useState(false);
          /******************* FIN *****************/ 

    /************************** MODAL USESTATE *****************/ 

    const [visibledetail, setVisibledetail]     = useState(false);
    const toggleDialogdetail                    = () => {setVisibledetail(!visibledetail);}

    //modification popup

    const [visiblemodif, setVisiblemodif]     = useState(false);
    const toggleDialogmodif                   = () => {setVisiblemodif(!visiblemodif);}
    /******************************* FIN **************************/

    /************************** INFORMATATIONS D'AJOUT UTILISATEUR *****************/ 
    const [p_nom, setNom]          = useState('');
    const [p_prenoms, setPrenoms]  = useState('');
    const [p_login, setLogin]      = useState('');
    const [p_email, setEmail]      = useState('');
    const [p_status, setStatus]        = useState(0);
    const [p_id, setP_id]             = useState('');
/************************** FIN*******************************************/  
/*********************MODIFICATION STATE ********************************/

const [loading, setLoading]        = useState(false);

/************************** FIN*******************************************/  

    const handleview=(props) =>{
        toggleDialogdetail();
            setNom(props.dataItem.r_nom);
            setPrenoms(props.dataItem.r_prenoms);
            setEmail(props.dataItem.r_email);
            setLogin(props.dataItem.r_login);
      }

      const handleEdit=(props) =>{       
            toggleDialogmodif();
            setNom(props.dataItem.r_nom);
            setPrenoms(props.dataItem.r_prenoms);
            setEmail(props.dataItem.r_email);
            setLogin(props.dataItem.r_login);
            setStatus(props.dataItem.r_statut);
            setP_id(props.dataItem.id);
      }

      const handleSubmit = (e)=> {

        e.preventDefault();
        setLoading(true);

        console.log('STATUT', p_status);
        let p_statut = 0;
        if(p_status)
        {
          p_statut=1
          console.log('STATUT002', p_statut);
          
        }else{
          p_statut=0;
          console.log('STATUT001', p_statut);
        }
        const data = {p_nom,p_prenoms,p_login,p_statut,p_email,p_id}
                                axios.post(httMehode.url+'userUp', data)
                                 .then((res)=> {
                                      if(res.status === 200){                                     
                                        setTimeout( () => {
                                          setLoading(false);
                                          toggleDialogmodif(); 
                                          onToggle(); 
                                          Listedat();                                  
                                        }, 1000)   
                                                                                                                                    
                                         }})
                                 .catch((error) => {console.log(error);});    
      }

      const FerConfirm = ()=>{
        setConfim(!confim);
      }

    return ( 
    <>
    
            <Grid
              pageable={true}
              sortable={true}
              filterable={true}
              style={{
                height: "100%",
                
              }}
              data={process(data, dataState)}
              {...dataState}
              onDataStateChange={(e) => {         
                setDataState(e.dataState);
              }}
            >

              <Column field="id"        title="ID"   filterable={true} />
              <Column field="r_nom"     title="Nom"     />
              <Column field="r_prenoms" title="Prénoms" filter="text"  />
              <Column field="r_login"   title="Login" filter="text"  />
              <Column field="r_email"   title="Email" filter="text"  />
              <Column filterable={false}   title="Options"
                    cell={(props) => (
                        <td>
                        <div className="example-col">       
                        <div class="btn-group" role="group" aria-label="Basic example">
                                <Button  themeColor={"tertiary"} onClick={e => handleview(props)} style={{marginRight: '5px'}}><i className="fa fa-eye"/> </Button>
                                <Button  themeColor={"warning"} onClick={e => handleEdit(props)} style={{marginRight: '5px'}}><i className="fa fa-edit"/>  </Button>
                                <Button  themeColor={"error"} onClick={() => FerConfirm()}><i className="fa fa-trash"/>  </Button>
                        </div>
                        </div>
                        </td>
                    )}/>
            </Grid>

            {visibledetail && ( <Window title={"DETAIL UTILISATEUR"} onClose={toggleDialogdetail} initialHeight={200} initialWidth={700} style={{backgroundColor:"#E7EFF1"}}>
                <form className="k-form">
                        <fieldset style={{marginBottom:'15px'}}>
                                <div className="row example-wrapper">                          
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Nom:</span>&nbsp;&nbsp; &nbsp;  {p_nom} </Label>
                                  <Label ><span style={{fontWeight: 'bold',color: 'black',}}>Email:</span>&nbsp;&nbsp; &nbsp;  {p_email}  </Label>
                                  </div>
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Prénoms:</span>&nbsp; &nbsp;  &nbsp; {p_prenoms} </Label>
                                  <Label ><span style={{fontWeight: 'bold',color: 'black',}}>Login:</span>&nbsp; &nbsp;  &nbsp;   &nbsp; &nbsp; &nbsp; {p_login}  </Label>
                                  </div>
                                </div>
                        </fieldset>
                        
                        <div className="text-right">
                              <button type="button" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleDialogdetail}>
                                Fermer
                              </button> 
                        </div>
                </form>
            </Window>)}

            {visiblemodif && ( <Window title={"MODIFICATION UTILISATEUR"} onClose={toggleDialogmodif} initialHeight={300} initialWidth={700} style={{backgroundColor:"#E7EFF1"}}>
                      <form className="k-form" onSubmit={handleSubmit}>
                              <fieldset style={{marginBottom:'15px'}}>
                              <span style={{ color: 'red', alignItems: 'center'}}>{errorMessage}</span>
                                      <div className="row example-wrapper">                          
                                        <div className="col-12 col-md-6 example-col">
                                                  <Input label="Entrez votre nom svp"             type="text"        value={p_nom}      onChange={(e)=> setNom(e.target.value)}/>
                                                  <Input label="Entrez votre email svp"           type="email"       value={p_email}   onChange={(e)=> setEmail(e.target.value)}/>                 
                                        </div>
                                        <div className="col-12 col-md-6 example-col">
                                                  <Input label="Entrez votre prenom svp"          type="text"        value={p_prenoms}  onChange={(e)=> setPrenoms(e.target.value)}/>
                                                  <Input label="Entrez votre login svp"           type="text"        value={p_login}   onChange={(e)=> setLogin(e.target.value)}/>
                                                  <Checkbox checked={p_status}   label={"Statut"} onClick={(e)=>setStatus(e.target.checked)}/>
                                        </div>
                                      </div>
                              </fieldset>
                              
                              <div className="text-right">
                                    <button type="button" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleDialogmodif}>
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

            {confim && (
                <Dialog title={"Veuillez confirmer"} onClose={FerConfirm}>
                  <p style={{ margin: "25px", textAlign: "center" }}>
                  Voulez vous supprimer cet utilisateur?
                  </p>
                  <DialogActionsBar>
                    <button
                      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                      onClick={FerConfirm}
                    >
                      Non
                    </button>
                    <button
                      className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                      onClick={FerConfirm}
                    >
                      Oui
                    </button>
                  </DialogActionsBar>
                </Dialog>
            )}
    
    </> 
    );
}
 
export default DataTables;