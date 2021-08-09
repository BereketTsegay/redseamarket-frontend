import React, { Component } from 'react';

class FileField extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            file: '',
            imagePreview: '',
            fileName: '',
        }
    }

    fileUpload = (e) => {

        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result,
              fileName: file.name,
            });
        }
        
        reader.readAsDataURL(file);

        this.props.fileUpload(file);
    }

    render() {
        
        let fileName = this.state.fileName;
        return (
                <div className="form-group form-ad-media-upload">
                        <label for="mediaUpload" className="d-flex align-items-center rounded mb-0 overflow-hidden">
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                        {this.props.placeholder}
                        <span className="btn btn-primary">Choose file</span>
                        {fileName != '' ? fileName : 'No file chosen'}
                        </label>
                        <input type="file" onChange={(e) => this.fileUpload(e)} className="form-control-file" id="mediaUpload" />
                </div>
            )
        }
}
export default FileField