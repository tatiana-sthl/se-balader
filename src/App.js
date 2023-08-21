import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import PlaceList from './components/placeList/PlaceList';
import AddPlaceForm from './components/addPlace/AddPlaceForm';
import EditPlaceForm from './components/editPlace/EditPlaceForm';

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
        <Route path="/add" element={<AddPlaceForm />} />
          <Route path="/edit/:id" element={<EditPlaceForm />} />
          <Route path="/" element={<PlaceList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
