
import { HashRouter as Router } from "react-router-dom";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Index from './components/layouts/index'

function App() {
  return (
      <Router> 
      
         <Switch>
         <Route exact path="/" component={Index} />
         </Switch>
      </Router>
  );
}

export default App;
