import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing';
import Home from './components/Home/Home';
import Details from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route
        exact path='/'
        component={LandingPage} />
        <Route
        path='/pokemons'
        component={Home} />
        <Route
        path='/details/:id'
        component={Details} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
