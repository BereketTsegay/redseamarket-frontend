// import React, { Component } from 'react';
import React, { useState, useEffect, useRef } from 'react'
// import Loader from "react-loader-spinner";
import LoadingBar from 'react-top-loading-bar';
import Swal from 'sweetalert2';

 const Loader = () => {
    
    const [progress, setProgress] = useState(10);
    
    
    // setTimeout(() => {
    //     setProgress(100);
    // }, 4000);
    

    // useEffect(() => {    // Update the document title using the browser API    
        
    //     setTimeout(() => {
            
    //         Swal.fire({
    //             title: 'Loading...',
    //             // html: 'I will close in <b></b> milliseconds.',
    //             // timer: 2000,
    //             timerProgressBar: true,
    //             didOpen: () => {
    //                 Swal.showLoading()
    //                 // const b = Swal.getHtmlContainer().querySelector('b');
    //             }
    //         });

    //     }, 4000); 
    // });

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
                    progress="98"
                    shadow='false'
                    height="4px"
                    // onLoaderFinished={() => setProgress(100)}
                />
            </div>
        )
    
}

export default Loader;
