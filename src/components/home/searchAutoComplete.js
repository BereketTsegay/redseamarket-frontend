import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { BASE_URL, IMAGE_URL } from '../../projectString';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class searchAutoComplete extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchResult: [],
            latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
            longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
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
            searchKey: '',
        }

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    // formatResult = (item) => {
        
    //     let data = '';
        
    //     item.forEach(item => {
            
    //         data += `<div class="row">
    //                         <div class="col-md-2">
    //                             <img src="${IMAGE_URL}/${item.images}" class="img-fluid" />
    //                         </div>
    //                         <div class="col-md-10">
    //                             ${item.name}
    //                         </div>
    //                     </div>`
    //     });

    //     return (<div dangerouslySetInnerHTML={{ __html: data}}></div>);
    // }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    handleClickOutside(event) {
        
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
        // alert('You clicked outside of me!');
            this.setState({
                searchResult: [],
            });
        }
        
        
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        
        // this.props.searchKey(string);
        this.setState({
            searchKey: nextProps.searchKey,
        });

        if(nextProps.searchKey !== ''){
            
            // const cancelTokenSource = axios.CancelToken.source();

            axios({
                // cancelToken: cancelTokenSource.token,
                url: `${BASE_URL}/search/autocomplete`,
                method: 'POST',
                data: {
                    country: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    search_key: nextProps.searchKey,
                    category: nextProps.category,
                    city: nextProps.city,
                    subcategory: nextProps.subcategory,
                    seller: nextProps.seller,
                    price_from: nextProps.price_from,
                    price_to: nextProps.price_to,
                    condition: nextProps.condition,
                    transmission: nextProps.transmission,
                    mileage_from: nextProps.mileage_from,
                    mileage_to: nextProps.mileage_to,
                }
            }).then(response => {
                
                if(response.data.status === 'success'){
                    
                    this.setState({
                        searchResult: response.data.ads,
                    });
                }

            }).catch((error) => {});

            // cancelTokenSource.cancel();

        }
        else{
            this.setState({
                searchKey: [],
            });
        }
        
        
    }

    // handleOnSelect = (item) => {
       
    //     this.props.history.push(`/adsdetails/${item.id}`);
    // }

    render() {
          
        //  let searchStyle = {
        //     // height: "44px",
        //     border: "1px solid #dfe1e5",
        //     borderRadius: "0.25rem",
        //     backgroundColor: "white",
        //     boxShadow: "none",
        //     hoverBackgroundColor: "none",
        //     focusBorderColor: '#80bdff',
        //     color: "#212121",
        //     fontSize: "16px",
        //     fontFamily: "Arial",
        //     iconColor: "grey",
        //     lineColor: "rgb(232, 234, 237)",
        //     placeholderColor: "grey",
        //     clearIconMargin: '3px 14px 0 0',
        //     searchIconMargin: '0 0 0 16px',
        //     zIndex: '100',
        //  }
        
        // let item = this.state.item;
        
        let searchResults = this.state.searchResult;

        return (
            <div ref={this.wrapperRef}>
                {/* <ReactSearchAutocomplete
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
                /> */}

                {this.props.searchKey !== '' &&  searchResults.length !== 0 ?
                    <div className="search-result-frame">
                        <div className="search-result-panel">
                            <ul className="search-result">
                                {searchResults && searchResults.map((searchResult, index) => {
                                if(index < 5){
                                    return (
                                        <li key={index}>
                                            <Link to={'adsdetails/'+ searchResult.id}>
                                                <div className="media"><img style={{maxWidth:'100px', maxHeight:'100px', minWidth:'100px', minHeight:'100px'}} src={IMAGE_URL + '/' + searchResult.images} alt="media" /></div>
                                                <div className="content">
                                                <h6 className="title">{searchResult.name}</h6>
                                                <div className="price">{searchResult.currency} {searchResult.price}</div>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                }
                                }) }
                            </ul>
                            {searchResults.length >= 5 ? <Link to={`search?key=${this.state.searchKey}`} className="search-reult-more">View More</Link> : '' }
                        </div>
                    </div> 
                    : '' }
            </div>
        )
    }
}

// searchAutoComplete.propTypes = {
//     children: PropTypes.element.isRequired,
// };

export default withRouter(searchAutoComplete);