import React, { Component } from 'react'

export default class resultTitleArea extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let {resultKey, listLength} = this.props;
        return (
            <div class="row">
                <div class="col-12">
                    <div class="section-title-panel text-center">
                    <h2 class="section-title mb-2">{resultKey} <small class="text-muted"> {this.props.lengthValue} ads</small></h2>
                    <p class="text-muted">Brand new &amp; used Motors for sale in Dubai - Sell your 2nd hand Motors on Jamal al bahr &amp; reach 1.6 million buyers today.</p>
                    </div>
                </div>
            </div>
        )
    }
}
