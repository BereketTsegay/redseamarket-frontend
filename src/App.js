
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

function App() {
  return (
      <Router> 
      
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/create-ads" component={ CreateAds } />
          <Route path="/create-form" component={ CreateForm } />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/myfavourite" component={Favourite} />
          <Route path="/myads" component={MyAds} />
          <Route path="/myprofile" component={Profile} />
          <Route path="/adsdetails/:id" component={AdsDetails} />
          <Route path="/categoryMotors" component={CategoryMotors} />
          <Route path="/categoryProperty/:id" component={CategoryProperty} />
        </Switch>
      </Router>
  );
}

export default App;
