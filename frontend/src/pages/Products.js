import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    setLoading(false);
  }, []);

  return (
    <div className="products">
      <h1>Products</h1>
      {loading ? <p>Loading...</p> : <p>Products catalog coming soon</p>}
    </div>
  );
}

export default Products;
