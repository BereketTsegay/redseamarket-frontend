// import React, { Component } from 'react';
import React, { useState, useEffeect, useRef } from 'react'
// import Loader from "react-loader-spinner";
import LoadingBar from 'react-top-loading-bar';

 const Loader = () => {
    
    const [progress, setProgress] = useState(10);
    
    
    setTimeout(() => {
        setProgress(100);
    }, 4000);
    

        return (
            
            // <Loader
            //     className="d-flex p-2 bd-highlight justify-content-center"
            //     type="Oval"
            //     color="#00BFFF"
            //     height={50}
            //     width={50}
            //     // timeout={3000} //3 secs
            // />

            <div>
                <LoadingBar 
                    color='#007bff'
                    progress="90"
                    shadow='true'
                    height="5px"
                    // onLoaderFinished={() => setProgress(100)}
                />
            </div>
        )
    
}

export default Loader;
