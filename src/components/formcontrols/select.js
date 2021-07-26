import React, { Component } from 'react';

class SelectField extends React.Component{
    render() {
      
        return (
            <div className="form-group">
                <select className="form-control">
                    <option selected>Usage</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                </select>
            </div>
        )
}
}
export default SelectField