import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './containers/homepage/homepage';
import Navbar from './components/navbar/navbar';
import Task1 from './containers/task1/task1';
import Task4 from './containers/task4/task4';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/titlesPublished" component={Task1} />
        <Route path="/topAttributes" component={Task4} />
      </div>
    </Router>
  );
}

export default App;
