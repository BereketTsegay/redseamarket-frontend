import axios from 'axios';
import React, { Component } from 'react'

export default class GoogleTranslate extends Component {

    googleTranslateElementInit () {
        //alert("test2")
        /* eslint-disable no-new */
        new window.google.translate.TranslateElement({pageLanguage: 'pt', includedLanguages: 'en,ar', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element')
    }

    constructor(props){
        super(props);

        this.googleTranslateElementInit = this.googleTranslateElementInit.bind(this);
    }

    componentWillMount() {
        // alert("test")

        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');        
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
    }

    render() {

        

        return (
            <div id="google_translate_element"></div>
        )
    }
}

