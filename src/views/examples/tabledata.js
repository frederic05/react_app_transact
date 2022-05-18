import React from "react";
import { useTable,usePagination } from "react-table";
import {Button,Table,Card,CardHeader,Row}  from "reactstrap";

const Tabledata = ({columns, data})=>{


  const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  setHiddenColumns,
  state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0},
      
    },
    usePagination
  );


return(
<>

<Table {...getTableProps()}  className="align-items-center table-flush" responsive>
<thead className="thead-light">
  {headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()} scope="col">{column.render("Header")}</th>
      ))}
    </tr>
  ))}
</thead>
<tbody {...getTableBodyProps()}>
  {page.map((row, i) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()} scope="row">
        {row.cells.map((cell) => {
          return (
            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
          );
        })}
      </tr>
    );
  })}
</tbody>
</Table>

<Row>
                            <div className="col">                         
                            <Card className="shadow">
                                <CardHeader className="border-0"> 
                                    <span class="badge badge-dark">Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}</span>

                                    <span class="badge badge-light">| Page:{' '}<input  type="number" defaultValue={pageIndex + 1} onChange={e => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0 
                                            gotoPage(page) }} style={{ width: '100px' }} /></span>

                                    <select  value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
                                              {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                                <option key={pageSize} value={pageSize}>Achiffer {pageSize}</option>))}
                                            </select>
                                    <Button className="float-right" color="default" size="sm"  onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Dernier </Button>
                                    <Button className="float-right" color="default" size="sm"  onClick={() => nextPage()} disabled={!canNextPage}><i className="ni ni-bold-right" /> </Button>
                                    <Button className="float-right" color="default" size="sm"  onClick={() => previousPage()} disabled={!canPreviousPage}><i className="ni ni-bold-left" /></Button>
                                    <Button className="float-right" color="default" size="sm"  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>Premier </Button>
                                </CardHeader>

                            </Card>
                            </div>                   
                      </Row>

</>)
}

export default Tabledata;