
import { HashRouter as Router } from "react-router-dom";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Index from './components/layouts/index';
import CreateForm from './components/ads/createform';
import CreateAds from './components/ads/createads';
import Register from './components/login/signup';
import Login from "./components/login/login";
import Favourite from "./components/account/favourite";
import MyAds from "./components/account/myAds";
import AdsDetails from "./components/ads/adsDetails";
import Profile from "./components/account/profile";
import CategoryMotors from "./components/automobile/categoryMotors";
import CategoryProperty from "./components/property/categoryProperty";
import MotorListing from "./components/automobile/motorListing";
import SearchList from "./components/common/searchList";
import ScrollToTop from "./components/common/scrollToTop";
import PropertyList from "./components/property/propertyList";
import SearchResult from "./components/automobile/searchResult";
import { public_key } from './projectString';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// import PaymentIntents from "./components/common/paymentIntents";

const stripePromise = loadStripe(public_key);

function App() {

    return (
      <Elements stripe={stripePromise}>
        <Router> 
          <Switch>
            <ScrollToTop>
              <Route exact path="/" component={Index} />
              <Route path="/create-ads" component={ CreateAds } />
              <Route path="/create-form/:category_id/:subcategory_id/:category/:subcategory" component={ CreateForm } />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/myfavourite" component={Favourite} />
              <Route path="/myads" component={MyAds} />
              <Route path="/myprofile" component={Profile} />
              <Route path="/adsdetails/:id" component={AdsDetails} />
              <Route path="/categoryMotors" component={CategoryMotors} />
              <Route path="/categoryProperty/:id" component={CategoryProperty} />
              <Route path="/motor/list" component={MotorListing} />
              <Route path="/search" component={SearchList} />
              <Route path="/property/list" component={PropertyList} />
              <Route path="/motor/result" component={SearchResult} />
            </ScrollToTop>
          </Switch>
        </Router>
      </Elements>
    );
  
}

export default App;
