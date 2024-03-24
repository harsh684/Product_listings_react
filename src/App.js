import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { Prev } from 'react-bootstrap/esm/PageItem';
import  ProductListing from './components/ProductListing'

function App() {
  return (
    <div className="container-fluid">
      <ProductListing/>
    </div>
  );

}

export default App;
