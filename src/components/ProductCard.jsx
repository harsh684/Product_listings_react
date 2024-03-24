import React, { useState } from 'react';
import '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='card-container shadow mx-auto rounded'>
      <div className="card mb-3">
      <img src={product.thumbnail} className="product-image" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text"><span className='product-sub-title'>Price:</span> <span>${product.price}</span></p>
        <p className="card-text"><span className='product-sub-title'>Rating:</span> <span>{product.rating}</span></p>
        {expanded && (
          <>
            <p className="card-text"><span className='product-sub-title'>Description:</span> <span>{product.description}</span></p>
            <p className="card-text"><span className='product-sub-title'>Stock:</span> <span>{product.stock}</span></p>
            <p className="card-text"><span className='product-sub-title'>Brand:</span> <span>{product.brand}</span></p>
            <p className="card-text"><span className='product-sub-title'>Category:</span> <span>{product.category}</span></p>
          </>
        )}
        <button onClick={toggleExpansion} className="btn btn-primary">
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
