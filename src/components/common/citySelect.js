import React, { Component } from 'react';
class Header extends React.Component{
    render() {
        return (
            <div className="country-select-panel d-block d-md-inline-block">
            <select className="form-control form-control-sm d-block d-md-inline-block">
               <option selected>All cities</option>
               <option>Abu Dhabi</option>
               <option>Ajman</option>
               <option>Al Ain</option>
               <option>Dubai</option>
               <option>Fujairah</option>
               <option>Ras al Khaimah</option>
               <option>Sharjah</option>
               <option>Umm al Quwain</option>
            </select>
         </div>
        )
    }
}
export default Header