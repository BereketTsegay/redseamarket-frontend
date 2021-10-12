import React, { Component } from 'react';

class FileField extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            file: '',
            imagePreview: '',
            fileName: '',
            image: '',
            fileCount: 0,
        }
    }

    fileUpload = (e) => {

        e.preventDefault();

        let files = e.target.files || e.dataTransfer.files;

        if (!files.length)
                return;

        this.setState({
            fileCount: files.length > 5 ? 5 : files.length,
        });

        for(let i = 0; i < files.length; i++){
            
            this.createImage(files[i]);
        }
            

    }

    createImage(file) {
        
        let reader = new FileReader();

        reader.onload = (e) => {
            this.setState({
                image: e.target.result,
                fileName: file.name,
            }, () => {
                this.props.fileUpload(this.state.image);
            })
        };

        reader.readAsDataURL(file);

    }

    render() {
        
        let fileName = this.state.fileName;
        let fileCount = this.state.fileCount;

        let error = this.props.error ? this.props.error : '';

        let ErrorStyle = {
            color: 'red',
        };

        return (
                <div className="form-group form-ad-media-upload">
                    <label for="mediaUpload" className="d-flex align-items-center rounded mb-0 overflow-hidden">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                    {this.props.placeholder}
                    <span className="btn btn-primary">Choose file</span>
                    {fileCount > 1 ? fileCount + ' File Selected' : fileName != '' ? fileName : 'No file chosen'}
                    </label>
                    <input type="file" onChange={(e) => this.fileUpload(e)} className="form-control-file" id="mediaUpload" multiple={this.props.multiple} accept=".png, .jpg, .jpeg" />
                    {error.length > 0 ? <p className="help-block help-block-error"  style={ErrorStyle}>{error}</p> : '' }
                </div>
            )
        }
}
export default FileField