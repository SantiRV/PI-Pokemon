import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';

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
        <Route 
        path='/pokemon'
        component={PokemonCreate} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
