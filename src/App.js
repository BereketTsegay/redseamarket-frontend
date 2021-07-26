
import { HashRouter as Router } from "react-router-dom";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Index from './components/layouts/index'
import CreateForm from './components/ads/createform'
function App() {
  return (
      <Router> 
      
         <Switch>
         <Route exact path="/" component={Index} />
         <Route path="/create-ads" component={ CreateForm } />
   
         </Switch>
      </Router>
  );
}

export default App;
