import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class breadcrumb extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <section className="section-breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ol className="breadcrumb breadcrumb-alt bg-white m-0 p-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{this.props.section}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
