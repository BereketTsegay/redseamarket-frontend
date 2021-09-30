import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { BASE_URL, IMAGE_URL } from '../../projectString';

class searchAutoComplete extends Component {

    constructor(props){
        super(props);

        this.state = {
            item: [],
            latitude: localStorage.getItem('latitude') ? localStorage.getItem('latitude') : 0,
            longitude: localStorage.getItem('longitude') ? localStorage.getItem('longitude') : 0,
            category: '',
            city: this.props.city,
            subcategory: '',
            seller: '',
            price_from: '',
            price_to: '',
            condition: '',
            transmission: '',
            mileage_from: '',
            mileage_to: '',
        }
    }

    formatResult = (item) => {
        
        let data = '';

        item.forEach(item => {
            data += `<div class="row">
                            <div class="col-md-2">
                                <img src="${IMAGE_URL}/${item.images}" class="img-fluid" />
                            </div>
                            <div class="col-md-10">
                                ${item.name}
                            </div>
                        </div>`
        });

        return (<div dangerouslySetInnerHTML={{ __html: data}}></div>);
    }

    handleOnSearch = (string, result) => {
        
        this.props.searchKey(string);

        axios({
            url: `${BASE_URL}/search/autocomplete`,
            method: 'POST',
            data: {
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                search_key: string,
                category: this.props.category,
                city: this.props.city,
                subcategory: this.props.subcategory,
                seller: this.props.seller,
                price_from: this.props.price_from,
                price_to: this.props.price_to,
                condition: this.props.condition,
                transmission: this.props.transmission,
                mileage_from: this.props.mileage_from,
                mileage_to: this.props.mileage_to,
            }
        }).then(response => {

            if(response.data.status === 'success'){
                
                this.setState({
                    item: response.data.ads,
                });
            }

        }).catch((error) => {});

        
    }

    handleOnSelect = (item) => {
        console.log(item);

        this.props.history.push(`/adsdetails/${item.id}`);
    }

    render() {
          
         let searchStyle = {
            // height: "44px",
            border: "1px solid #dfe1e5",
            borderRadius: "0.25rem",
            backgroundColor: "white",
            boxShadow: "none",
            hoverBackgroundColor: "none",
            focusBorderColor: '#80bdff',
            color: "#212121",
            fontSize: "16px",
            fontFamily: "Arial",
            iconColor: "grey",
            lineColor: "rgb(232, 234, 237)",
            placeholderColor: "grey",
            clearIconMargin: '3px 14px 0 0',
            searchIconMargin: '0 0 0 16px'
         }
        
        let item = this.state.item;

        return (
            <div>
                <ReactSearchAutocomplete
                    placeholder="Search for anything..."
                    className="form-control"
                    styling={searchStyle}
                    items={item}
                    onSearch={this.handleOnSearch}
                    // onHover={handleOnHover}
                    onSelect={this.handleOnSelect}
                    // onFocus={handleOnFocus}
                    // autoFocus
                     formatResult={() => this.formatResult(item)}
                />
            </div>
        )
    }
}

export default withRouter(searchAutoComplete);