
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

function App() {
  return (
      <Router> 
      
         <Switch>
         <Route exact path="/" component={Index} />
         <Route path="/create-ads" component={ CreateAds } />
         <Route path="/create-form" component={ CreateForm } />
         <Route path="/register" component={Register} />
         <Route path="/login" component={Login} />
         </Switch>
      </Router>
  );
}

export default App;
