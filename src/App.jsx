import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import PlaceList from './components/PlaceList';
import AddPlaceForm from './components/AddPlaceForm';
import EditPlaceForm from './components/EditPlaceForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/add">Ajouter un lieu</Link></li>
          </ul>
        </nav>

        <Routes> 
          <Route path="/add" component={AddPlaceForm} />
          <Route path="/edit/:id" component={EditPlaceForm} />
          <Route path="/" component={PlaceList} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
