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
                    <h2 class="section-title mb-2"><span className="notranslate">{resultKey}</span> <small class="text-muted"> <span className="notranslate">{this.props.lengthValue}</span> jobs</small></h2>
                    {/* <p class="text-muted">Brand new &amp; used Motors for sale in Dubai - Sell your 2nd hand Motors on Red Sea Market &amp; reach 1.6 million buyers today.</p> */}
                    </div>
                </div>
            </div>
        )
    }
}
