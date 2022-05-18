
import React, { useState, useEffect, useRef } from 'react';
import httMehode from 'common/service';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Label } from "@progress/kendo-react-labels";
import { Window} from "@progress/kendo-react-dialogs";
import './DataTableDemo.css';
import './ButtonDemo.css';

const TableOperation = (props) => {

    const items = props.products

    let emptyProduct = {
        id: null,
        r_client: '',
        r_emetteur: '',
        r_destinataire: '',
        r_valeur: 0,
        r_operateur: '',
        r_statut: 'ENSTOCK'
    };


     //modification popup

     const [visibledetail, setVisibledetail]     = useState(false);
     const toggleDialogdetail                    = () => {setVisibledetail(!visibledetail);}
     /******************************* FIN **************************/

     /***************** VARIABLE DETAIL OPERATION ****************/

     const [dnom, setDnom]              = useState('')
     const [dprenoms, setDprenoms]      = useState('')
     const [demail, setemail]           = useState('')

     const [drefClient, setrefClient]   = useState('')
     const [drefOp, setrefOp]           = useState('')
     const [drefSys, setrefSys]         = useState('')
     const [dcanal, setCanal]           = useState('')

     const [demet, setEmet]             = useState('')
     const [ddest, setDest]             = useState('')
     const [dope, setOpe]               = useState('')
     const [dmontant, setMontant]       = useState('')
     const [dmotif, setMotif]           = useState('')
     const [ddate, setDate]           = useState('')

         /***************** FIN ****************/

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [importedData, setImportedData] = useState([]);
    const [importedCols, setImportedCols] = useState([{ field: '', header: 'Header' }]);
    const toast = useRef(null);
    const dt = useRef(null);

    const cols = [
        { field: 'r_client', header: 'CLient' },
        { field: 'r_emetteur', header: 'Emetteur' },
        { field: 'r_destinataire', header: 'Destinateur' },
        { field: 'r_valeur', header: 'Montant' }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    const Listedat = ()=>{
                setProducts(items)   
      }

      useEffect(()=>{
        Listedat();
      },[Listedat]);

    const editProduct = (product) => {
        console.log('product',product)
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }


    const detailProd = (product) => {
        console.log('product',product)     
        setDnom(product.r_client)
        setDprenoms(product.r_prenoms)
        setemail(product.r_email)
        setrefSys(product.r_reference_sys)
        setrefClient(product.r_reference_client)
        setrefOp(product.r_reference_operateur)
        setCanal(product.r_canal)
        setEmet(product.r_emetteur)
        setDest(product.r_destinataire)
        setOpe(product.r_operateur)
        setMontant(product.r_valeur)
        setMotif(product.r_message)
        setDate(product.r_date_paiement)
        toggleDialogdetail()
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const importCSV = (e) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            const importedData = data.map(d => {
                d = d.split(',');
                const processedData = cols.reduce((obj, c, i) => {
                    c = c === 'Status' ? 'r_statut' : '';
                    obj[c] = d[i].replace(/['"]+/g, '');
                    (c === 'price' || c === 'rating') && (obj[c] = parseFloat(obj[c]));
                    return obj;
                }, {});

                processedData['id'] = createId();
                return processedData;
            });

            const _products = [...products, ...importedData];

            setProducts(_products);
        };

        reader.readAsText(file, 'UTF-8');
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const importExcel = (e) => {
        const file = e.files[0];

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols = data[0];
                data.shift();

                let _importedCols = cols.map(col => ({ field: col, header: toCapitalize(col) }));
                let _importedData = data.map(d => {
                    return cols.reduce((obj, c, i) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                setImportedCols(_importedCols);
                setImportedData(_importedData);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    const toCapitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'products');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });
                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('products.pdf');
            })
        })
    }


    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }


    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button type="button" icon="pi pi-file" onClick={exportCSV} className="mr-2" data-pr-tooltip="CSV" style={{width: '30px', height:'30px'}}/>
                <Button type="button" icon="pi pi-file-excel"onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" style={{width: '30px', height:'30px'}}/>
                <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" style={{width: '30px', height:'30px'}}/>
            </React.Fragment>
        )
    }

    const statusBodyTemplate = (rowData) => {
        if(rowData.r_statut === 0)
        {
            
            return <Badge value="ECHEC" severity="danger" className="mr-2"></Badge>
        }else{
            return <Badge value="VALIDER" severity="success" className="mr-2"></Badge>
        
    }
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info mr-2" onClick={() => detailProd(rowData)} style={{width: '30px', height:'30px'}}/>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} style={{width: '30px', height:'30px'}}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} style={{width: '30px', height:'30px'}}/>
            </React.Fragment>
        );
    }

      const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">LISTE DES OPERATIONS</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Rechercge..." />
            </span>
        </div>
    );

    return ( 

        <div className="datatable-crud-demo">
            <div className="card">
            <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Liste {first} de  {last} è {totalRecords} Opérations"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">

                    <Column field="r_client" header="Nom Client" sortable style={{ minWidth: '12rem'}}></Column>
                    <Column field="r_emetteur" header="Numéro Emetteur" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="r_destinataire" header="Numéro Destinateur" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="r_valeur" header="Montant" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="r_operateur" header="Opérateur" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="r_statut" header="Statut" body={statusBodyTemplate}  sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                   
            </DataTable>


            {visibledetail && ( <Window title={`DETAIL OPERATION DU ${ddate}`} onClose={toggleDialogdetail} initialHeight={550} initialWidth={700} style={{backgroundColor:"#EBECE6"}}>
                <form className="k-form">
                        <fieldset style={{marginBottom:'15px'}}>
                        
                        <Label style={{marginBottom:'20px',fontWeight: 'bold',color: 'black',alignItems:'center',backgroundColor:'#0BBEEA'}}><span class="k-icon k-i-user"></span>&nbsp;&nbsp; &nbsp;DETAIL INFORMATIONS DU CLIENT</Label>
                                <div className="row example-wrapper">                                                         
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Nom:</span>&nbsp;&nbsp; &nbsp;  {dnom} </Label>
                                  <Label ><span style={{fontWeight: 'bold',color: 'black',}}>Email:</span>&nbsp;&nbsp;  {demail}  </Label>
                                  </div>
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Prénoms:</span>&nbsp; &nbsp;  &nbsp; {dprenoms} </Label>
                                  </div>
                                </div>


                                <Label style={{marginTop:'20px', marginBottom:'20px',fontWeight: 'bold',color: 'black', textAlign:'center',backgroundColor:'#0BBEEA'}}><span class="k-icon k-i-arrows-resizing"></span>&nbsp;&nbsp; &nbsp;DETAIL REFERENCES  TRANSACTION</Label>
                                <div className="row example-wrapper">                                                     
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Référence Système:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {drefSys} </Label>
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Référence Operateur:</span>&nbsp;&nbsp;  {drefOp}  </Label>
                                  </div>
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Référence Client:</span>&nbsp;&nbsp;&nbsp; {drefClient} </Label>
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Canal:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {dcanal}  </Label>                                
                                  </div>
                                </div>

                                <Label style={{marginTop:'20px', marginBottom:'20px',fontWeight: 'bold',color: 'black', textAlign:'center',backgroundColor:'#0BBEEA'}}><span class="k-icon k-i-arrows-swap"></span>&nbsp;&nbsp; &nbsp;DETAIL INFORMATIONS  TRANSACTION</Label>
                                <div className="row example-wrapper">                                                     
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Emetteur:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {demet}  </Label>
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Opérateur:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {dope}  </Label>
                                  <Label ><span style={{fontWeight: 'bold',color: 'black',}}>Motif:</span>&nbsp;&nbsp;&nbsp;  {dmotif}  </Label>
                                  </div>
                                  <div className="col-12 col-md-6 example-col">
                                  <Label style={{marginBottom:'15px'}}><span style={{fontWeight: 'bold',color: 'black',}}>Destinataire:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ddest}  </Label>
                                  <Label ><span style={{fontWeight: 'bold',color: 'black',}}>Montant:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {dmontant}&nbsp;&nbsp; XOF  </Label>
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
            </div>       
        </div>
     );
}
 
export default TableOperation;