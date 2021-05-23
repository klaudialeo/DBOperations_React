import './App.css';
import React from 'react';
import SearchForm from './Components/SearchForm.jsx';

function App() {
  return (
    <>
      <div className="bg-image">
        <div className="logo-image">
          <img src="db_logo.png" type="image/png" alt="DB Logo" style={{ height: '50px', margin: '10px' }}></img>
        </div>
      </div>
      <div className="search-form">
        <SearchForm />
      </div>
    </>
  );
}

export default App;
