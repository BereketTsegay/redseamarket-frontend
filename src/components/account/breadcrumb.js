import React, { Component } from 'react'

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
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
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
