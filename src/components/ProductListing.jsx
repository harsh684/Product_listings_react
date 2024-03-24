import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductListing.css'

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      setLoading(false);
    }
  };

  const clearFilter = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products`);
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error fetching all products:', error);
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid p-0 my-2'>
      <div className='main-title text-center fs-1'>Products</div>
      <div className='justify-content-center justify-content-sm-end d-flex w-100 px-sm-2 px-md-1 px-xl-4'>
        <div className='filter-container shadow '>
          <select className='form-select' onChange={(e) => e.target.value === '' ? clearFilter() : filterByCategory(e.target.value)}>
            <option value=''>All Categories</option>
            <option value='smartphones'>Smartphones</option>
            <option value='laptops'>Laptops</option>
            <option value='furniture'>Furniture</option>
            <option value='groceries'>Groceries</option>
            <option value='skincare'>Skincare</option>
            <option value='fragrances'>Fragrances</option>
            <option value='tops'>Tops</option>
            <option value='home-decoration'>Home Decor</option>

          </select>
        </div>
      </div>

     {loading ? (
       <p>Loading...</p>
     ) : (
       <>
         <div className='my-3 mt-md-4 px-sm-2 px-md-1 px-xl-4'>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
           {products.map(product => (
             <div key={product.id} className="col-md-4 mb-3">
               <ProductCard product={product} />
             </div>
           ))}
         </div>
         <nav aria-label="Product Pagination">
              <ul className="pagination justify-content-center gap-3">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevPage}>Previous</button>
                </li>
                <li className="page-item">
                  <button className="page-link" onClick={nextPage}>Next</button>
                </li>
              </ul>
            </nav>
         </div>
       </>
     )}
    </div>
  );
};

export default ProductListing;