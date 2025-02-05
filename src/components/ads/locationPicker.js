import React, { Component } from 'react'
import TextField from '../formcontrols/text';
import MapPicker from 'react-google-map-picker';
import { GOOGLEMAPS_API } from '../../projectString';

export default class locationPicker extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            zoom: 10,
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 25.1988,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 55.2796,
        }

    }

    handleChange = () => {
        
    }

    handleChangeLocation = (latitude, longitude) => {

        this.setState({
            latitude: latitude,
            longitude: longitude,
        });

        this.props.changeLatLng(latitude, longitude);
    }

    handleChangeZoom = (newZoom) => {
        this.setState({
            zoom: newZoom,
        });
    }

    render() {

        let subcategoryName = this.props.subcategoryName;

        let error = this.props.error ? this.props.error : '';

        let {zoom, latitude, longitude} = this.state;

        let defaultLocation = {lat:latitude, lng:longitude};

        return (
            <>
                {/* <TextField handleChange={this.handleChange} placeholder={`Locate your ${subcategoryName}`} error={error} /> */}

                <div className="create-ad-location mb-4 mb-md-5">
                    <h4 className="title mb-2">Is the pin in the right location?</h4>
                    <p>Click and drag the pin to the exact spot. Users are more likely to respond to ads that are correctly shown on the map</p>
                    <MapPicker className="map-frame overflow-hidden"
                        defaultLocation={defaultLocation}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{height:'300px'}}
                        onChangeLocation={this.handleChangeLocation} 
                        onChangeZoom={this.handleChangeZoom}
                        apiKey={GOOGLEMAPS_API} />

                {/* <div className="map-frame overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d68715.3019452309!2d55.304360684611346!3d25.155860292817362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1626524584118!5m2!1sen!2sin"></iframe>
                </div> */}
                </div>
            </>
        )
    }
}
