// filepath: /C:/Users/ELITEBOOK/OneDrive/Bureau/E-commerce-master/frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/add-product" component={AddProduct} />
      </Switch>
    </Router>
  );
};

export default App;