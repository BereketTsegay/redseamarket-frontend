
import { HashRouter as Router } from "react-router-dom";
import {
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Index from './components/layouts/index';
import CreateForm from './components/ads/createform';
import UpdateForm from './components/ads/updateform';
import CreateAds from './components/ads/createads';
import Register from './components/login/signup';
import Login from "./components/login/login";
import Favourite from "./components/account/favourite";
import MyAds from "./components/account/myAds";
import MyTransactions from "./components/account/MyTransactions";
import AdsEnquiry from "./components/account/AdsEnquiry";
import DocumentList from "./components/account/documentList";
import AdsDetails from "./components/ads/adsDetails";
import Profile from "./components/account/profile";
import CategoryMotors from "./components/automobile/categoryMotors";
import CategoryProperty from "./components/property/categoryProperty";
import MotorListing from "./components/automobile/motorListing";
import JobListing from "./components/jobs/jobList";
import SearchList from "./components/common/searchList";
import ScrollToTop from "./components/common/scrollToTop";
import AllCategory from "./components/common/all-category-list";
import PropertyList from "./components/property/propertyList";
import SearchResult from "./components/automobile/searchResult";
import { public_key } from './projectString';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import SubSubCategorySelect from "./components/ads/SubSubCategorySelect";
// import PaymentIntents from "./components/common/paymentIntents";

const stripePromise = loadStripe(public_key);

function App() {

    return (
      <Elements stripe={stripePromise}>
        <Router >
          <ScrollToTop> 
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/create-ads" component={ CreateAds } />
              <Route path="/create-form/:category_id/:subcategory_id/:category/:subcategory" component={ CreateForm } />
              <Route path="/update-form/:id" component={ UpdateForm } />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/myfavourite" component={Favourite} />
              <Route path="/myads" component={ MyAds } />
              <Route path="/mytransactions" component={ MyTransactions } />
              <Route path="/ad/enquiries/:id" component={ AdsEnquiry } />
              <Route path="/job/document/list/:id" component={ DocumentList } />
              <Route path="/myprofile" component={Profile} />
              <Route path="/allCategory" component={AllCategory} />
              <Route path="/adsdetails/:id" component={AdsDetails} />
              <Route path="/categoryMotors" component={CategoryMotors} />
              <Route path="/categoryProperty/:id" component={CategoryProperty} />
              <Route path="/motor/list" component={MotorListing} />
              <Route path="/job/list" component={JobListing} />
              <Route path="/search" component={SearchList} />
              <Route path="/property/list" component={PropertyList} />
              <Route path="/motor/result" component={SearchResult} />
              <Route path="/privacy/policy" component={PrivacyPolicy} />
              <Route path="/terms/conditions" component={TermsConditions} />
              <Route path="/about" component={AboutUs} />
              <Route path="/contact" component={ContactUs} />
              <Route path="/subcategory/:id/:category_id/:category_name" component={SubSubCategorySelect} />
            </Switch>
          </ScrollToTop>
        </Router>
      </Elements>
    );
  
}

export default App;
