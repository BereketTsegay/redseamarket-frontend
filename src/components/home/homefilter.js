import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { BASE_URL, IMAGE_URL } from '../../projectString';
import heroImage from '../../../src/web-assets/img/home-hero-bg.jpg';
import SearchAutoComplete from './searchAutoComplete';
import { Link } from 'react-router-dom';

class homefilter extends Component {

   constructor(props){
      super(props);

      this.state = {
         searchKey: '',
         category: '',
         subcategory: '',
         city: '',
         country_id: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
         cityArray: [],
         banner: null,
         searchResult: [],
         latitude: sessionStorage.getItem('latitude') ? parseFloat(sessionStorage.getItem('latitude')) : 0,
         longitude: sessionStorage.getItem('longitude') ? parseFloat(sessionStorage.getItem('longitude')) : 0,
      }
   }

   handleChange = (e) => {

      this.setState({
         searchKey: e.target.value,
      });

      let string = e.target.value;

      if(string !== ''){
         axios({
            url: `${BASE_URL}/search/autocomplete`,
            method: 'POST',
            data: {
               country: localStorage.getItem('country_id') ? localStorage.getItem('country_id') : 229,
               latitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.latitude,
               longitude: localStorage.getItem('country_id') || this.state.city ? 0 : this.state.longitude,
               search_key: string,
               category: this.state.category,
               city: this.state.city,
               subcategory: this.state.subcategory,
            }
         }).then(response => {

            if(response.data.status === 'success'){
               
               this.setState({
                  searchResult: response.data.ads,
               });
            }

         }).catch((error) => {});
      }
      else{
         this.setState({
            searchResult: [],
         });
      }
      
   }

   componentWillMount = () => {

      axios({
         url: `${BASE_URL}/customer/city/list`,
         method: 'POST',
         data: {
             country_id: this.state.country_id,
         },
      }).then(response => {
            if(response.data.status === 'success'){

               this.setState({
                  cityArray: response.data.city,
               });
            }

      }).catch((error) => {

      });

      axios({
         url: `${BASE_URL}/customer/get/home/banner`,
         method: 'POST',
         data: {
             country: this.state.country_id,
         },
      }).then(response => {
            if(response.data.status === 'success'){

               this.setState({
                  banner: response.data.banner,
               });
            }

      }).catch((error) => {

      });
   }

   handlSubmit = () => {
      
      // if(this.state.searchKey != ''){
         
         if(this.state.category == '' && this.state.city == ''){
            
            this.props.history.push('/search?key='+this.state.searchKey);
         }
         else if(this.state.category != ''){
            
            if(this.state.category == 1 && this.state.city == '' && this.state.subcategory == ''){
               
               this.props.history.push('/motor/list?key='+this.state.searchKey);
            }
            else if((this.state.category == 2 && this.state.city == '' && this.state.subcategory == '' && !this.state.searchKey) || (this.state.category == 3 && this.state.city == '' && this.state.subcategory == '' && !this.state.searchKey)){
               
               this.props.history.push('/categoryProperty/'+this.state.category)
            }
            else if (this.state.subcategory != '' && this.state.city != '') {
               
               this.props.history.push('/search?key='+this.state.searchKey+'&city='+this.state.city+'&category='+this.state.category+'&subcategory='+this.state.subcategory);
            }
            else if(this.state.subcategory != '') {
               
               this.props.history.push('/search?key='+this.state.searchKey+'&city=&category='+this.state.category+'&subcategory='+this.state.subcategory);
            }
            else if(this.state.city != ''){
               
               this.props.history.push('/search?key='+this.state.searchKey+'&city='+this.state.city+'&category='+this.state.category+'&subcategory=');
            }
            else if(this.state.category != '' && this.state.subcategory == '' && this.state.city == ''){

               this.props.history.push('/search?key='+this.state.searchKey+'&city=&category='+this.state.category+'&subcategory=');
            }
         }
      // }

   }

   subcategoryChange = e => {

      this.setState({
         subcategory: e.target.value,
      });
   }

   categoryChange = category_id => {

      this.setState({
         category: category_id,
      });
   }

   cityChange = e => {

      this.setState({
         city: e.target.value,
      });
   }

   searchKeyEvent = (key) => {

      this.setState({
         searchKey: key,
      });
   }

    render() {

      let {searchKey} = this.state;

      let categoryList = this.props.category;

      let cityArray = this.state.cityArray;

      let banner = this.state.banner;

      let bannerImage = banner ? IMAGE_URL + '/' + banner.image : heroImage;
      
      let searchResult = this.state.searchResult;
      
        return (
           <div> 
        <section className="section-home-hero" style={{background: `#000 url('${bannerImage}') no-repeat center/cover`, }}>
           

           <div className="container">
                  <div className="row">
                     <div className="col-xl-6 col-lg-8 col-md-11 mx-auto">
                        <h2 className="section-title text-white text-center">{ banner ? banner.name : 'The best place to buy your house, sell your car or find a job.'}</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-10 mx-auto">
                        <ul className="nav nav-tabs hero-nav-tabs" id="heroNavTabs" role="tablist">
                           <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                           </li>

                           {categoryList && categoryList.map((categoryList, index) => {
                              if(index < 5){
                                 return (
                                    <li className="nav-item" role="presentation" key={index} onClick={() => this.categoryChange(categoryList.id)}>
                                       <a className="nav-link" id="motors-tab" data-toggle="tab" href={`#cat${index}`} role="tab" aria-controls={`cat${index}`} aria-selected="false">{categoryList.name}</a>
                                    </li>
                                 )
                              }
                              else{
                                 return '';
                              }
                           })}
                           
                        </ul>
                        <div className="tab-content" id="heroNavContent">
                           <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
                              <div className="hero-search hero-search-home">
                                 <div className="row">
                                    <div className="col-md-9">
                                       <div className="form-group">
                                          <input type="text" value={searchKey} onChange={(e) => this.handleChange(e)} className="form-control" placeholder="Search for anything…" />
                                          <SearchAutoComplete searchKey={searchKey} />
                                       </div>
                                       {/* {searchResult.length != 0 ?
                                       <div className="search-result-frame">
                                          <div className="search-result-panel">
                                             <ul className="search-result">
                                                {searchResult && searchResult.map((searchResult, index) => {
                                                   return (
                                                      <li key={index}>
                                                         <Link to={'adsdetails/'+ searchResult.id}>
                                                            <div className="media"><img src={IMAGE_URL + '/' + searchResult.images} alt="media" /></div>
                                                            <div className="content">
                                                               <h6 className="title">{searchResult.name}</h6>
                                                               <div className="price">{searchResult.currency} {searchResult.price}</div>
                                                            </div>
                                                         </Link>
                                                      </li>
                                                   )
                                                }) }
                                             </ul>
                                             <a href="#" className="search-reult-more">View More</a>
                                          </div>
                                       </div> : ''} */}
                                    </div>
                                    <div className="col-md-3">
                                       <button className="btn btn-primary has-icon w-100" onClick={this.handlSubmit}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                          Search
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {categoryList && categoryList.map((categoryList, index) => {
                              
                              if(index < 5){
                                 
                                 return (
                                    <div className="tab-pane fade" id={`cat${index}`} role="tabpanel" aria-labelledby="motors-tab">
                                       <div className="hero-search hero-search-home">
                                          <div className="row row-options">
                                             <div className="col-md-6">
                                                <div className="form-group">
                                                   <select onChange={(e) => this.cityChange(e)} className="form-control">
                                                      <option value="">All Cities</option>

                                                      {cityArray ? cityArray.map((city, index) => {
                                                         if(this.state.city == city.id){
                                                            return <option selected value={city.id}>{city.name}</option>
                                                         }
                                                         else{
                                                            return <option value={city.id}>{city.name}</option>
                                                         }
                                                      }) : ''}
                                                      
                                                   </select>
                                                </div>
                                             </div>
                                             <div className="col-md-6">
                                                <div className="form-group">
                                                   <select className="form-control" onChange={(e) => this.subcategoryChange(e)}>
                                                      <option>All Subcategories</option>
                                                      {categoryList.subcategory ? categoryList.subcategory.map((subcategory, index) => {
                                                         return <option value={subcategory.id}>{subcategory.name}</option>;
                                                      }) : ''}
                                                   </select>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="row">
                                             <div className="col-md-9">
                                                <div className="form-group">
                                                   <input type="text" className="form-control" value={searchKey} onChange={(e) => this.handleChange(e)} placeholder="Search for anything…" />
                                                   {this.state.category == categoryList.id ? <SearchAutoComplete searchKey={searchKey} city={this.state.city} category={this.state.category} subcategory={this.state.subcategory} /> : '' }
                                                </div>
                                             </div>
                                             <div className="col-md-3">
                                                <button onClick={this.handlSubmit} className="btn btn-primary has-icon w-100">
                                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                   Search
                                                </button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              }
                              else{
                                 return '';
                              }
                           })}
                           
                        </div>
                     </div>
                  </div>
               </div>
           
        </section>
        
        </div>

)
        }
}

export default withRouter(homefilter);
