import React, { Component } from 'react';

class FileField extends React.Component{
    render() {
      
        return (
                <div className="form-group form-ad-media-upload">
                        <label for="mediaUpload" className="d-flex align-items-center rounded mb-0 overflow-hidden">
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                        Add pictures
                        <span className="btn btn-primary">Choose file</span>
                        No file chosen
                        </label>
                        <input type="file" className="form-control-file" id="mediaUpload" />
                </div>
            )
        }
}
export default FileField