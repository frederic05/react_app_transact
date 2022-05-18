import React from "react";

const TablePagination = (props) => {
    return (
        <div className="TablePagination">
            <div className="table-pagesIndexing">{props.pageIndex + 1} out of {props.pageOptions.length}</div>
            <div className="navigationButtonsContainer">
                <button
                    onClick={props.previousPage}
                    disabled={!props.canPreviousPage}
                > Précédant
                </button>
                <ul style={{ display: "flex" }}>
                    {
                        props.pageOptions.map((index, page) => {
                            let totalPages = props.pageOptions.length;
                            if (page + 1 > 5 && page + 1 < 10 && totalPages >= 10) {
                                return
                            }
                            if (page + 1 === 10) {
                                return <li key={index}>....{10}</li>
                            }
                            if (page + 1 > 10 && totalPages > 10) {
                                const numbersOFpagesAfter_Page_10 = props.pageOptions.slice(10);
                                if (numbersOFpagesAfter_Page_10.length > 3 && page + 1 === totalPages) {
                                    return <li key={index}>....{totalPages}</li>
                                }
                                if (numbersOFpagesAfter_Page_10.length > 3 && page + 1 <= 12) {
                                    return <li key={index}>{page + 1}</li>
                                }
                                if (numbersOFpagesAfter_Page_10.length > 3) {
                                    return
                                }
                                return <li key={index}>{page + 1}</li>
                            }
                            return <li key={index}>{page + 1}</li>
                        })}
                </ul>
                <button
                    onClick={
                        props.nextPage
                    }
                    disabled={!props.canNextPage}
                >Suivant
                </button>
            </div>
        </div>
    );
}

export default TablePagination;