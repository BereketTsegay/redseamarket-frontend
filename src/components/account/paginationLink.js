import React, { Component } from 'react'

export default class paginationLink extends Component {

    constructor(props){
        super(props);
    }

    paginationCall = (e, url) => {

        e.preventDefault();

        this.props.paginationChange(url);
    }

    render() {

        let paginataionArray = this.props.paginataionArray;
        let last = this.props.last;
        let previousPage = this.props.previousPage;
        let nexPage = this.props.nexPage;

        return (
            <div className="pagination-frame">
                <div className="row">
                    <div className="col-xl-11 mx-auto">
                    <ul className="pagination pagination-alt justify-content-center mt-4 mt-md-2 mb-1">
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.paginationCall(e, previousPage)} aria-label="Previous"><i className="fa fa-angle-left" aria-hidden="true"></i></a></li>
                        {paginataionArray.map((paginataionArray, index) => {
                            
                            if(index != 0 && index != last+1){
                                return <li key={index} className={paginataionArray.active === true ? 'page-item active' : 'page-item'}><a className="page-link" href="#" onClick={(e) => this.paginationCall(e, paginataionArray.url)}>{paginataionArray.label}</a></li>;
                            }
                        })} 
                        
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => this.paginationCall(e, nexPage)} aria-label="Next"><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}
